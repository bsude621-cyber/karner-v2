"use client";

import { useEffect, useRef } from "react";

/**
 * KARNER Line Flow — hero arka planı için özel yazılmış WebGL shader.
 *
 * 21st.dev "Purple Wave Shader"ın yerine geçer. Farklar:
 *  - Çizgiler çapraz akar (uAngle ile döndürülmüş uzay)
 *  - Dalga üretimi farklı: katmanlı sinüs + değişken kalınlık ("filament" görünümü)
 *  - Çizgi üzerinde ilerleyen ışık düğümleri (veri paketi motifi)
 *  - İmleç etkileşimi: çizgiler kursordan kaçar ve yakınında parlar
 *
 * Marka renkleri: #7B3FE4 / #4B1D96. Harici bağımlılık yok.
 */

type KarnerLineFlowProps = {
  className?: string;
  /** Akış açısı (derece). Negatif değer = sol alttan sağ üste. */
  angleDeg?: number;
  /** Genel parlaklık çarpanı. */
  intensity?: number;
  /** İmleç etkileşimi açık/kapalı. */
  interactive?: boolean;
};

/**
 * Shader'ın çizildiği iç çözünürlük çarpanı (1 = tam çözünürlük).
 * Tek ayar noktası: yükseltmek keskinlik, düşürmek performans kazandırır.
 */
const RENDER_SCALE = 0.7;

const VERT = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const FRAG = `
  precision highp float;

  uniform vec2  iResolution;
  uniform float iTime;
  uniform vec2  iMouse;     // canvas pikseli
  uniform float uAngle;     // radyan
  uniform float uIntensity;
  uniform float uInteract;  // 0.0 / 1.0
  uniform float uBase;      // 1.0 koyu tema (mor zemin/vinyet), 0.0 açık tema (temiz beyaz)

  const int LINE_COUNT = 14;

  float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453123);
  }

  // Ucuz ama organik dalga — fbm yerine 3 sinüs (mobilde de akıcı)
  float wave(float x, float s) {
    return (sin(x + s)
          + sin(x * 1.73 + s * 1.3) * 0.6
          + sin(x * 2.91 + s * 2.1) * 0.3) / 1.9;
  }

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    vec2 p  = rot(uAngle) * uv;

    vec2 mUv = (iMouse - 0.5 * iResolution.xy) / iResolution.y;
    vec2 mp  = rot(uAngle) * mUv;

    float t = iTime;
    vec3 col = vec3(0.0);

    vec3 cDeep  = vec3(0.294, 0.114, 0.588); // #4B1D96
    vec3 cBrand = vec3(0.482, 0.247, 0.894); // #7B3FE4
    vec3 cHot   = vec3(0.87, 0.80, 1.00);    // sıcak çekirdek

    // --- Döngüden bağımsız terimler ---
    // Bunlar çizgi indeksine (i) hiç bağlı değil, sadece piksele bağlı.
    // Döngünün içinde durdukları için piksel başına 20 kez hesaplanıyorlardı.
    float md2   = dot(p - mp, p - mp);              // length() yerine: sqrt yok
    float push  = uInteract * 0.13 * exp(-md2 * 5.0); // imleç itmesi
    float boost = 1.0 + uInteract * 1.1 * exp(-md2 * 4.0); // imleç parlaması
    float band  = 0.42 + 0.58 * exp(-p.y * p.y * 1.1);     // merkez bandı

    for (int i = 0; i < LINE_COUNT; i++) {
      float fi   = float(i) / float(LINE_COUNT);
      float seed = float(i) * 12.9898;

      // Minimal: az sayıda, ince, sakin akan filament. Genlik çizgi aralığının
      // altında; çeşitlilik frekanstan değil fazdan ve hızdan gelir.
      float speed = 0.14 + hash(seed) * 0.22;
      float amp   = 0.022 + hash(seed + 3.1) * 0.040;
      float freq  = 0.85 + hash(seed + 7.7) * 0.50;
      float phase = hash(seed + 9.3) * 6.283;
      float yOff  = (fi - 0.5) * 1.82 + (hash(seed + 5.5) - 0.5) * 0.05;

      // ERKEN ELEME — bu pikselin bu çizgiye uzaklığı, dalga genliği (amp,
      // en fazla 0.062) hesaba katıldığında bile büyükse, çizginin bu piksele
      // katkısı 8-bit'te sıfırın altında kalıyor. Dalgayı hiç hesaplamadan geç.
      // Piksel başına 20 çizgiden ~10'u burada eleniyor.
      if (abs(p.y - yOff) < 0.45) {
        float x  = p.x * freq + t * speed + phase;
        float wy = wave(x, seed) * amp;
        float dy = p.y - (yOff + wy);

        // ikinci eleme — artık gerçek uzaklık belli
        if (abs(dy) < 0.38) {
          // imleç itmesi: çizgiler kursordan kaçınır (push döngü dışında hazır)
          dy += push * sign(dy + 0.0001);

          // kalınlık boyunca nefes alsın — düz şerit yerine filament hissi
          float wob = 0.60 + 0.40 * (sin(x * 0.6 + seed) * 0.5 + 0.5);
          float w = mix(0.0015, 0.0040, hash(seed + 1.7)) * wob;

          // keskin çekirdek + dar hale. Hale yarıçapı çizgi aralığının (~0.052)
          // altında kalmalı; yoksa haleler birleşip mor bir sise dönüşüyor.
          float core = pow(w / (abs(dy) + w), 2.2);
          float halo = pow((w * 5.0) / (abs(dy) + w * 5.0), 1.7) * 0.22;
          float g = (core + halo) * boost * band;

          // pow(g, 5.0) yerine çarpma — matematiksel olarak birebir aynı, ucuz
          float g2 = g * g;
          float g5 = g2 * g2 * g;

          vec3 lc = mix(cDeep, cBrand, fi);
          lc = mix(lc, cHot, g5);
          col += lc * g;

          // çizgi üzerinde ilerleyen ışık düğümü — minimal: sadece bazı tellerde,
          // seyrek birer kıvılcım (kabarcık değil).
          float nodeOn = step(0.55, hash(seed + 4.2));
          float nx  = mod(t * speed * 1.6 + fi * 4.3, 2.8) - 1.4;
          float nwy = wave(nx * freq + t * speed + phase, seed) * amp;
          float nd  = length(p - vec2(nx, yOff + nwy));
          col += nodeOn * cHot * smoothstep(0.012, 0.0, nd) * 0.7 * band;
          col += nodeOn * cBrand * smoothstep(0.05, 0.0, nd) * 0.1 * band;
        }
      }
    }

    // başlık okunurluğu için toplam ışığı dengele
    col *= 0.78 * uIntensity;

    // zemin: derin mor çekirdek, kenarlara doğru siyaha düşen vignette
    float vig = 1.0 - smoothstep(0.35, 1.15, length(uv * vec2(0.85, 1.0)));
    col += mix(vec3(0.016, 0.008, 0.043), vec3(0.055, 0.024, 0.118), vig) * uBase;
    col *= mix(1.0, 0.55 + 0.45 * vig, uBase);

    // premultiplied: alfa = en parlak kanal → koyuda aynı görünüm, açıkta saydam zemin
    gl_FragColor = vec4(col, max(max(col.r, col.g), col.b));
  }
`;

export function KarnerLineFlow({
  className = "",
  angleDeg = -22,
  intensity = 1,
  interactive = true,
}: KarnerLineFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Tam ekran quad — antialias edilecek geometri kenarı yok, MSAA saf maliyet.
    // alpha:true — gündüz modunda beyaz zemin üstüne mor çizgiler (siyah kutu yok)
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "aVertexPosition");
    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uMouse = gl.getUniformLocation(program, "iMouse");
    const uAngle = gl.getUniformLocation(program, "uAngle");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");
    const uInteract = gl.getUniformLocation(program, "uInteract");
    const uBase = gl.getUniformLocation(program, "uBase");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const interactOn = interactive && canHover && !reduceMotion ? 1 : 0;

    // Piksel ölçeği: buffer'ı CSS boyutundan küçük tutup tarayıcıya büyüttürüyoruz.
    // Fragment maliyeti piksel sayısıyla doğrusal — 0.70 ölçek ~%50 piksel demek.
    // Arka plan yumuşak geçişli olduğu için ölçekleme gözle fark edilmiyor.
    // Performans (2026-08-21): mobilde daha düşük iç çözünürlük ve 30 fps,
    // masaüstünde 60 fps tavanı (120-144 Hz ekranlarda GPU yükü 2× artıyordu).
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const minFrameMs = isMobile ? 1000 / 30 : 1000 / 60;
    let lastFrame = 0;
    let pxScale = 1;
    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      pxScale = Math.min(window.devicePixelRatio || 1, 1.5) * (isMobile ? 0.5 : RENDER_SCALE);
      canvas.width = Math.max(1, Math.floor(w * pxScale));
      canvas.height = Math.max(1, Math.floor(h * pxScale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      // imleç yokken merkezden uzakta dursun
      if (!pointerSeen) {
        target[0] = canvas.width * 0.5;
        target[1] = canvas.height * 1.4;
        mouse[0] = target[0];
        mouse[1] = target[1];
      }
    };

    // hedef (ham) ve yumuşatılmış imleç konumu — canvas pikselinde
    const target = new Float32Array([0, 0]);
    const mouse = new Float32Array([0, 0]);
    let pointerSeen = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerSeen = true;
      target[0] = (e.clientX - rect.left) * pxScale;
      target[1] = (rect.bottom - e.clientY) * pxScale; // GL y yukarı
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactOn) window.addEventListener("pointermove", onPointerMove);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const angle = (angleDeg * Math.PI) / 180;
    const start = performance.now();
    let frameId = 0;

    const render = () => {
      frameId = requestAnimationFrame(render);
      if (!visible) return;
      const nowMs = performance.now();
      if (nowMs - lastFrame < minFrameMs - 1) return;
      lastFrame = nowMs;

      // imleci yumuşat — sert sıçrama olmasın
      mouse[0] += (target[0] - mouse[0]) * 0.07;
      mouse[1] += (target[1] - mouse[1]) * 0.07;

      const time = reduceMotion ? 0 : (performance.now() - start) / 1000;

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uAngle, angle);
      // Akış iki modda da AYNI: aynı çizgiler, aynı hareket. İki fark var, ikisi
      // de renk kaynaklı:
      //   uIntensity 0.75 — aynı sayısal parlaklık açık zeminde daha güçlü
      //     okunuyor; göze eşit gelmesi için kısılıyor.
      //   uBase 0.0 — uBase shader'ın kendi KOYU mor zeminini + vinyetini ekler.
      //     Aydınlıkta zemini sayfa veriyor (uzay grisi), üstüne koyu bir kat
      //     eklemek hero'yu karartırdı. Çekirdek parlaması iki modda da CSS
      //     .hero-halo katmanından geliyor.
      const lightTheme = document.documentElement.dataset.theme === "light";
      gl.uniform1f(uIntensity, intensity * (lightTheme ? 0.75 : 1.0));
      gl.uniform1f(uInteract, interactOn);
      gl.uniform1f(uBase, lightTheme ? 0.0 : 1.0);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [angleDeg, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ background: "transparent" }}
    />
  );
}

export default KarnerLineFlow;

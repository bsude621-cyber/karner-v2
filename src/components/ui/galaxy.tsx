"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

/**
 * Katmanlı yıldız alanı (reactbits.dev "Galaxy", ogl/WebGL).
 *
 * Dört derinlik katmanı sonsuz ileri kayar ve tüm sahne yavaşça döner —
 * "dönen halkalar" hissi buradan gelir. Yıldızlar Hash21 ile hücre başına
 * üretilir, parıldar ve fare yaklaşınca itilir.
 *
 * Tema: aynı shader iki modda da aynı yıldız alanını üretir; fark çıkış
 * renginde. Koyu temada yıldızlar KENDİ renkleriyle ışır. Açık temada
 * `inkMode` devreye girer: renk sabit grafit olur, alfa yoğunluğu taşır —
 * sönük yıldız hafif gri tane, parlak çekirdek koyu nokta ("ay yüzeyi").
 * Işıyan bir yıldız açık zeminde parlayamaz, zeminden parlak olamaz.
 *
 * Performans: dpr 1'e sabit (tam ekran fragment shader — dahili GPU'da en
 * pahalı iş fill-rate'tir), sekme gizliyken ve ekran dışındayken kare yok,
 * hareketi-azalt tercihinde animasyon durur.
 */
export type GalaxyProps = {
  className?: string;
  /** Yıldız yoğunluğu (katman ölçeği). Büyük değer = daha sık, daha küçük yıldız. */
  density?: number;
  /** Işıma gücü. inkMode'da tane büyüklüğünü/yumuşaklığını belirler. */
  glowIntensity?: number;
  /** Parıldama miktarı (0 = sabit). */
  twinkleIntensity?: number;
  /** Renk doygunluğu (0 = gri tonlama). */
  saturation?: number;
  /** Tüm yıldızların rengini kaydırır (derece). saturation 0 iken etkisizdir. */
  hueShift?: number;
  /** Kendiliğinden dönme hızı. */
  rotationSpeed?: number;
  /** Katmanların ileri kayma hızı. */
  starSpeed?: number;
  /** Genel hız çarpanı. */
  speed?: number;
  /** Fare etkileşimi (masaüstü). Dokunmatikte zaten kapatılır. */
  mouseInteraction?: boolean;
  /** Fare yıldızları itsin mi. */
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  /** true: yıldızlar ışımaz, sabit renkli grafit tane olarak çizilir (açık zemin). */
  inkMode?: boolean;
  /** Mürekkep modunda tanelerin rengi (r,g,b — 0..1). */
  inkColor?: [number, number, number];
  /** Genel yoğunluk çarpanı (alfa). */
  alphaScale?: number;
};

const vertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3  uResolution;
uniform vec2  uFocal;
uniform vec2  uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2  uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool  uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uInkMode;    // 0 = isiyan yildiz (koyu tema), 1 = grafit tane (acik tema)
uniform vec3  uInkColor;   // murekkep modunda tanelerin rengi
uniform float uAlphaScale; // genel yogunluk carpani

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}
float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(
        tris(seed * 34.0 + uTime * uSpeed / 10.0),
        tris(seed * 38.0 + uTime * uSpeed / 30.0)
      ) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * base;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    uv += (uMouse - vec2(0.5)) * 0.1 * uMouseActiveFactor;
  }

  float a = uTime * uRotationSpeed;
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  // Saydam zemin: sayfanın kendi rengi görünsün, yalnızca yıldızlar çizilsin.
  float alpha = min(smoothstep(0.0, 0.3, length(col)), 1.0);

  // Işıyan bir yıldız açık zeminde parlayamaz — zeminden daha parlak olamaz.
  // Bu yüzden aydınlık modda renk SABİT grafit, alfa yoğunluğu taşır: sönük
  // yıldız = hafif gri tane, parlak çekirdek = koyu nokta. "Ay yüzeyi" dokusu.
  // (CSS invert(1) bunu yapmaz: alfa hâlâ ışık miktarı olduğu için sönük
  //  ışıma sönük BEYAZA döner ve zeminde kaybolur.)
  vec3 outCol = mix(col, uInkColor, uInkMode);
  gl_FragColor = vec4(outCol, alpha * uAlphaScale);
}
`;

export function Galaxy({
  className = "",
  density = 1,
  glowIntensity = 0.3,
  twinkleIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  rotationSpeed = 0.1,
  starSpeed = 0.5,
  speed = 1,
  mouseInteraction = true,
  mouseRepulsion = true,
  repulsionStrength = 2,
  inkMode = false,
  inkColor = [0.12, 0.13, 0.15],
  alphaScale = 1,
}: GalaxyProps) {
  const ctnRef = useRef<HTMLDivElement>(null);
  // Değişken propları ref'te tutuyoruz: effect yalnızca bir kez kurulsun,
  // her prop değişiminde WebGL bağlamı yeniden yaratılmasın.
  const opts = useRef({
    density, glowIntensity, twinkleIntensity, saturation, hueShift,
    rotationSpeed, starSpeed, speed, mouseRepulsion, repulsionStrength,
    inkMode, inkColor, alphaScale,
  });
  opts.current = {
    density, glowIntensity, twinkleIntensity, saturation, hueShift,
    rotationSpeed, starSpeed, speed, mouseRepulsion, repulsionStrength,
    inkMode, inkColor, alphaScale,
  };

  useEffect(() => {
    const ctn = ctnRef.current;
    if (!ctn) return;

    const coarse = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      // Tam ekran fragment shader — kenar geometrisi yok, MSAA saf maliyet.
      antialias: false,
      // dpr 1: yoğunluk yerine çözünürlük düşürmek görünümü en az bozan kısıt.
      dpr: 1,
      powerPreference: "low-power",
    });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const o = opts.current;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(1, 1, 1) },
        uFocal: { value: new Float32Array([0.5, 0.5]) },
        uRotation: { value: new Float32Array([1, 0]) },
        uStarSpeed: { value: o.starSpeed },
        uDensity: { value: o.density },
        uHueShift: { value: o.hueShift },
        uSpeed: { value: o.speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uGlowIntensity: { value: o.glowIntensity },
        uSaturation: { value: o.saturation },
        uMouseRepulsion: { value: o.mouseRepulsion && !coarse },
        uTwinkleIntensity: { value: o.twinkleIntensity },
        uRotationSpeed: { value: o.rotationSpeed },
        uRepulsionStrength: { value: o.repulsionStrength },
        uMouseActiveFactor: { value: 0 },
        uInkMode: { value: o.inkMode ? 1 : 0 },
        uInkColor: { value: new Color(o.inkColor[0], o.inkColor[1], o.inkColor[2]) },
        uAlphaScale: { value: o.alphaScale },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(ctn);

    ctn.appendChild(gl.canvas);

    // Görünürlük kapıları: ekran dışında veya sekme gizliyken kare üretme.
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 });
    io.observe(ctn);

    const target = { x: 0.5, y: 0.5, active: 0 };
    const smooth = { x: 0.5, y: 0.5, active: 0 };

    const onMove = (e: PointerEvent) => {
      const r = ctn.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      target.active = 1;
    };
    const onLeave = () => { target.active = 0; };
    const interactive = mouseInteraction && !coarse;
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      ctn.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!onScreen || document.hidden) return;

      const p = opts.current;
      if (!reduceMotion) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * p.starSpeed) / 10;
      }
      // Prop güncellemeleri bağlamı yeniden kurmadan uygulanır.
      program.uniforms.uDensity.value = p.density;
      program.uniforms.uGlowIntensity.value = p.glowIntensity;
      program.uniforms.uTwinkleIntensity.value = p.twinkleIntensity;
      program.uniforms.uSaturation.value = p.saturation;
      program.uniforms.uHueShift.value = p.hueShift;
      program.uniforms.uRotationSpeed.value = p.rotationSpeed;
      program.uniforms.uSpeed.value = p.speed;
      program.uniforms.uInkMode.value = p.inkMode ? 1 : 0;
      program.uniforms.uAlphaScale.value = p.alphaScale;
      program.uniforms.uInkColor.value.set(p.inkColor[0], p.inkColor[1], p.inkColor[2]);

      const k = 0.05;
      smooth.x += (target.x - smooth.x) * k;
      smooth.y += (target.y - smooth.y) * k;
      smooth.active += (target.active - smooth.active) * k;
      program.uniforms.uMouse.value[0] = smooth.x;
      program.uniforms.uMouse.value[1] = smooth.y;
      program.uniforms.uMouseActiveFactor.value = smooth.active;

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (interactive) {
        window.removeEventListener("pointermove", onMove);
        ctn.removeEventListener("pointerleave", onLeave);
      }
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // Bağlam bir kez kurulur; değişken proplar ref üzerinden akar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseInteraction]);

  return <div ref={ctnRef} aria-hidden className={`galaxy-layer ${className}`} />;
}

export default Galaxy;

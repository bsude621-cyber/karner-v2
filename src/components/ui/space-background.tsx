"use client";

import { useEffect, useRef } from "react";
import { createStableResize } from "@/lib/stable-resize";

interface Particle {
  color: string;
  radius: number;
  x: number;
  y: number;
  ring: number;
  move: number;
  random: number;
}

/**
 * Canvas'ın çizildiği iç çözünürlük çarpanı (1 = tam çözünürlük).
 * Tek ayar noktası: yükseltmek keskinlik, düşürmek performans kazandırır.
 */
const RENDER_SCALE = 0.7;

interface SpaceBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  className?: string;
}

/**
 * Marka moru galaxy / yıldız alanı arka planı (21st.dev "Space Background"
 * uyarlaması). Tüm ekran yerine bulunduğu kapsayıcıya (parent) sığar.
 */
export function SpaceBackground({
  particleCount = 500,
  particleColor = "#a371ff",
  className = "",
}: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;

    const state = {
      particles: [] as Particle[],
      r: 120,
      counter: 0,
    };

    const isLight = () => document.documentElement.dataset.theme === "light";
    // Aynı dönen halka, iki palet. İkisi de mor; aydınlıktakiler açık zeminde
    // okunabilsin diye koyu uçtan seçilmiş.
    const paletteDark = ["#7b3fe4", "#a371ff", "#4b1d96", "#c9b6ff", particleColor];
    const paletteLight = ["#7b3fe4", "#5a2ec4", "#4b1d96", "#8b5cf6", "#6d28d9"];
    const palette = isLight() ? paletteLight : paletteDark;

    const setupCanvas = () => {
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      // Buffer'ı CSS boyutundan küçük tutup tarayıcıya büyüttürüyoruz.
      // Parçacıklar yumuşak noktalar olduğu için ölçekleme gözle fark edilmiyor,
      // boyama maliyeti ise piksel sayısıyla doğrusal düşüyor.
      // Mobilde iç çözünürlük daha düşük (yumuşak noktalar, fark edilmez)
      const scale = window.innerWidth < 640 ? 0.5 : RENDER_SCALE;
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      state.r = Math.max(80, Math.min(canvas.width, canvas.height) / 4);
      ctx.setTransform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);
    };
    setupCanvas();

    const createParticle = () => {
      state.particles.push({
        color: palette[Math.floor(Math.random() * palette.length)],
        radius: Math.random() * 2.2,
        x: Math.cos(Math.random() * 7 + Math.PI) * state.r,
        y: Math.sin(Math.random() * 7 + Math.PI) * state.r,
        ring: Math.random() * state.r * 3,
        move: (Math.random() * 4 + 1) / 500,
        random: Math.random() * 7,
      });
    };
    // Mobilde parçacık sayısı %40'a iner — dar ekranda fark edilmez, CPU rahatlar.
    const effectiveCount = window.matchMedia("(max-width: 639px)").matches
      ? Math.round(particleCount * 0.4)
      : particleCount;
    for (let i = 0; i < effectiveCount; i++) createParticle();

    const moveParticle = (p: Particle) => {
      p.ring = Math.max(p.ring - 1, state.r);
      p.random += p.move;
      p.x = Math.cos(p.random + Math.PI) * p.ring;
      p.y = Math.sin(p.random + Math.PI) * p.ring;
    };

    const resetParticle = (p: Particle) => {
      p.ring = Math.random() * state.r * 3;
      p.radius = Math.random() * 2.2;
    };

    const disappear = (p: Particle) => {
      if (p.radius < 0.4) resetParticle(p);
      p.radius *= 0.994;
    };

    const draw = (p: Particle) => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    let visible = true;
    // Performans (2026-08-21): mobilde 30 fps, masaüstünde 60 fps tavanı.
    const isMobileFps = window.matchMedia("(max-width: 639px)").matches;
    const minFrameMs = isMobileFps ? 1000 / 30 : 1000 / 60;
    let lastFrame = 0;
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      if (!visible) return; // ekran dışındayken çizme (performans)
      const nowMs = performance.now();
      if (nowMs - lastFrame < minFrameMs - 1) return;
      lastFrame = nowMs;
      // Dönüşüm merkezi ortaya aldığı için görünür alan -w/2 … w/2 arası.
      // Burası eskiden -w … w temizliyordu, yani her karede gereğinin dört
      // katı piksel siliniyordu.
      ctx.clearRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      if (state.counter < state.particles.length) state.counter++;
      for (let i = 0; i < state.counter; i++) {
        disappear(state.particles[i]);
        moveParticle(state.particles[i]);
        draw(state.particles[i]);
      }
    };
    animationRef.current = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    // Yeniden ayırmayı gecikmeli ve gerçekten gerektiğinde yap: iOS'ta URL
    // çubuğu kıpırdadıkça tuval tamponunu baştan ayırmak boşuna bellek
    // hareketi (bkz. lib/stable-resize.ts).
    const stableResize = createStableResize(
      () => ({
        width: parent ? parent.clientWidth : window.innerWidth,
        height: parent ? parent.clientHeight : window.innerHeight,
      }),
      setupCanvas,
    );

    let resizeObserver: ResizeObserver | null = null;
    if (parent && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(stableResize.notify);
      resizeObserver.observe(parent);
    } else {
      window.addEventListener("resize", stableResize.notify);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", stableResize.notify);
      stableResize.dispose();
      io.disconnect();
    };
  }, [particleCount, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

export default SpaceBackground;

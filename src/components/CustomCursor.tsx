"use client";

import { useEffect, useRef, useState } from "react";

/**
 * İmleç efekti (yalnızca hassas işaretçi / mouse).
 * Koyu mod: beyaz ok imlecinin peşinde giden mor parıltı + halka.
 * Gündüz modu ("Mühendis Kâğıdı"): kâğıt üstünde mürekkep kalem — küçük mürekkep
 * noktası + kısa, solan mürekkep izi (canvas). Parıltı/halka gündüzde kapalı.
 * Dokunmatik cihazlarda ve reduced-motion'da devre dışı.
 */
export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    // Sadece hassas işaretçide (mouse) çalışsın
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const readTheme = () => setLight(document.documentElement.dataset.theme === "light");
    readTheme();
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering = !!el.closest('a, button, [role="button"]');
      if (ringRef.current) {
        ringRef.current.style.setProperty("--ring-scale", hovering ? "1.8" : "1");
        ringRef.current.style.setProperty("--ring-opacity", hovering ? "1" : "0.5");
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(var(--ring-scale, 1))`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Gündüz: mürekkep izi (canvas). Sadece light'ta kurulur, tema değişince sökülür.
  useEffect(() => {
    if (!enabled || !light) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Pt = { x: number; y: number; t: number };
    const pts: Pt[] = [];
    const LIFE = 420; // ms — izin solma süresi
    let raf = 0;
    let running = false;
    let last = { x: -1, y: -1 };

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // eski noktaları at
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      if (pts.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const age = (now - b.t) / LIFE; // 0 yeni → 1 eski
          const alpha = (1 - age) * 0.55;
          ctx.strokeStyle = `rgba(26, 20, 48, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2 + (1 - age) * 1.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // kalem ucu
      if (last.x >= 0) {
        ctx.fillStyle = "rgba(26, 20, 48, 0.85)";
        ctx.beginPath();
        ctx.arc(last.x, last.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (pts.length) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      last = { x: e.clientX, y: e.clientY };
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 40) pts.shift();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    const onLeave = () => {
      last = { x: -1, y: -1 };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [enabled, light]);

  if (!enabled) return null;

  return (
    <>
      {light ? (
        /* gündüz: mürekkep kalem izi */
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9999]"
        />
      ) : (
        <>
          {/* yumuşak mor parıltı (imlecin tam üstünde) */}
          <div
            ref={glowRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[60px] -mt-[60px] h-[120px] w-[120px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(123,63,228,0.35) 0%, rgba(123,63,228,0) 70%)",
              mixBlendMode: "screen",
            }}
          />
          {/* takip eden ince mor halka */}
          <div
            ref={ringRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border border-accent transition-[opacity] duration-200"
            style={{
              opacity: "var(--ring-opacity, 0.5)",
              boxShadow: "0 0 12px rgba(123,63,228,0.8)",
            }}
          />
        </>
      )}
    </>
  );
}

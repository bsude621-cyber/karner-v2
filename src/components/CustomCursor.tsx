"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Beyaz ok imlecinin peşinde giden mor parıltı + halka efekti.
 * Dokunmatik cihazlarda devre dışı.
 */
export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Sadece hassas işaretçide (mouse) çalışsın
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

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
        ringRef.current.style.setProperty(
          "--ring-scale",
          hovering ? "1.8" : "1"
        );
        ringRef.current.style.setProperty(
          "--ring-opacity",
          hovering ? "1" : "0.5"
        );
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
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
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
  );
}

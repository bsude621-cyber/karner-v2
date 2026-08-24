"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Lenis başlatması idle'a ertelenir: açılışta ana thread'i meşgul etmesin,
    // yumuşak kaydırma ilk boyamadan hemen sonra devreye girsin.
    let lenis: Lenis | undefined;
    let rafId: number | undefined;

    const start = () => {
      // Dokunmatik cihazlarda doğal kaydırma: Lenis'in kare döngüsü boşuna çalışıyordu
      if (window.matchMedia("(pointer: coarse)").matches) return;
      // "Hareketi azalt" tercihi: yumuşatılmış kaydırma tam da bu tercihin
      // kapsadığı şey — tarayıcının kendi kaydırmasına bırakıyoruz.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
      } catch (err) {
        // Yumuşak kaydırma bir SÜS. Kurulamazsa sayfa normal kaydırmayla
        // çalışmaya devam etmeli; bu bileşen tüm sayfayı sardığı için buradan
        // sızan bir hata siteyi komple hata ekranına düşürürdü.
        console.warn("[KARNER] yumuşak kaydırma başlatılamadı:", err);
        return;
      }
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(start, { timeout: 1500 })
        : window.setTimeout(start, 300);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

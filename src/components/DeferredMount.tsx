"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Ağır (3D/shader) bileşenleri kritik render yolundan çıkarır.
 *
 * Masaüstü: tarayıcı boşa düştüğünde (requestIdleCallback) mount eder —
 * hero metni ve gradient anında boyanır, sahne ~1-2 sn içinde gelir.
 *
 * Mobil: ilk kullanıcı etkileşiminde (dokunuş/scroll) mount eder; hiç
 * etkileşim gelmezse emniyet zamanlayıcısıyla yine yüklenir. Böylece
 * telefonun kısıtlı işlemcisi sayfa açılışında Three.js ile boğuşmaz —
 * LCP ve INP eşikleri korunur.
 */
export default function DeferredMount({
  children,
  mobileFallbackDelayMs = 12000,
}: {
  children: ReactNode;
  mobileFallbackDelayMs?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const cleanups: (() => void)[] = [];
    const arm = () => setReady(true);

    if (isMobile) {
      const events: (keyof WindowEventMap)[] = [
        "pointerdown",
        "touchstart",
        "scroll",
        "keydown",
      ];
      events.forEach((e) =>
        window.addEventListener(e, arm, { once: true, passive: true }),
      );
      cleanups.push(() =>
        events.forEach((e) => window.removeEventListener(e, arm)),
      );
      const t = window.setTimeout(arm, mobileFallbackDelayMs);
      cleanups.push(() => window.clearTimeout(t));
    } else if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(arm, { timeout: 2000 });
      cleanups.push(() => window.cancelIdleCallback(id));
    } else {
      const t = window.setTimeout(arm, 350);
      cleanups.push(() => window.clearTimeout(t));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [mobileFallbackDelayMs]);

  return ready ? <>{children}</> : null;
}

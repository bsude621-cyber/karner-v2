"use client";

import { useEffect, useState, type ReactNode } from "react";
import SafeBoundary from "@/components/SafeBoundary";

/**
 * Ağır (3D/shader) bileşenleri kritik render yolundan çıkarır ve kendi hata
 * sınırının içine kapatır.
 *
 * NE ZAMAN MOUNT EDER
 * - Masaüstü: tarayıcı boşa düştüğünde (requestIdleCallback) — hero metni ve
 *   gradient anında boyanır, sahne ~1-2 sn içinde gelir.
 * - Mobil: ilk kullanıcı etkileşiminde (dokunuş/scroll) VEYA sayfa `load`
 *   olduktan sonraki ilk boşlukta. `load`, LCP'den sonra gelir; yani sahne
 *   ilk boyamayı geciktirmez ama kimse ekrana dokunmasa bile makul sürede
 *   belirir. (Eskiden tek yedek 12 sn'lik bir zamanlayıcıydı: dokunmayan
 *   ziyaretçi robotları hiç görmüyordu.)
 *
 * NEDEN HATA SINIRI İÇİNDE
 * Buradan geçen her şey tarayıcının GPU'suna bağımlı. Biri hata fırlatırsa
 * SafeBoundary yalnızca o katmanı düşürür; sayfa "bir hata oluştu" ekranına
 * dönmez. Ayrıntı: SafeBoundary.tsx
 */
export default function DeferredMount({
  children,
  name = "3B/shader katmanı",
  mobileFallbackDelayMs = 12000,
}: {
  children: ReactNode;
  /** Konsol uyarısında görünecek katman adı */
  name?: string;
  /** Son çare emniyet zamanlayıcısı (load olayı hiç gelmezse) */
  mobileFallbackDelayMs?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const cleanups: (() => void)[] = [];
    const arm = () => setReady(true);

    const onIdle = (cb: () => void, timeout: number) => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(cb, { timeout });
        return () => window.cancelIdleCallback(id);
      }
      const t = window.setTimeout(cb, Math.min(timeout, 350));
      return () => window.clearTimeout(t);
    };

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

      // Etkileşim gelmezse: sayfa yüklenmesi bitsin, sonra ilk boşlukta gir.
      const afterLoad = () => cleanups.push(onIdle(arm, 2500));
      if (document.readyState === "complete") {
        afterLoad();
      } else {
        window.addEventListener("load", afterLoad, { once: true });
        cleanups.push(() => window.removeEventListener("load", afterLoad));
      }

      // Son çare: `load` hiç gelmezse (asılı kalan bir istek vb.) yine de yüklen.
      const t = window.setTimeout(arm, mobileFallbackDelayMs);
      cleanups.push(() => window.clearTimeout(t));
    } else {
      cleanups.push(onIdle(arm, 2000));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [mobileFallbackDelayMs]);

  if (!ready) return null;

  return <SafeBoundary name={name}>{children}</SafeBoundary>;
}

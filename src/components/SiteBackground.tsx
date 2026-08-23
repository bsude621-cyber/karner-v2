"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// WebGL yalnızca tarayıcıda, kritik render yolunun dışında.
const Galaxy = dynamic(
  () => import("@/components/ui/galaxy").then((m) => ({ default: m.Galaxy })),
  { ssr: false }
);

/**
 * Site geneli sabit yıldız alanı — tüm sayfa bunun üzerinde kayar.
 *
 * Tek bir WebGL bağlamı; daha önce aynı işi üç ayrı sahne yapıyordu
 * (DottedSurface, SpaceBackground ve bölüm bölüm parıltılar).
 *
 * Tema: shader her iki modda da aynı açık yıldızları çizer. Aydınlık modda
 * katman CSS `invert(1)` ile ters çevrilir (bkz. globals.css .galaxy-layer):
 * açık gri zemin üzerinde grafit taneler — "ay yüzeyi". Karanlıkta ters
 * çevirme yok, gerçek sim parıltı görünür.
 *
 * Parıltı koyu zemin ister: açık zeminde ışıyan bir yıldız zeminden daha
 * parlak olamaz. Bu yüzden aydınlıkta ışıma değil doku okunur — yapı,
 * hareket ve yoğunluk iki modda birebir aynı kalır.
 */
export default function SiteBackground() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const read = () =>
      setLight(document.documentElement.dataset.theme === "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  return (
    // Zemin rengini <body> boyuyor (background: var(--background)); bu katman
    // yalnızca yıldızları taşır, kendi zemini yok.
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Galaxy
        // Aydınlık: taneler sabit grafit renkte, alfa yoğunluğu taşır.
        // Karanlık: yıldızlar kendi renkleriyle ışır (marka moruna kaydırılmış).
        inkMode={light}
        // Marka moru. Grafit yerine mor seçilince aynı alfada doku zayıflıyor
        // (mor daha açık), bu yüzden alfa .2 → .28: ölçümde görünürlük %31.1 ile
        // grafitin %32.5'ine, sayfa ortalaması 230.8 ile 230.7'ye oturuyor —
        // yoğunluk aynı, renk mor.
        inkColor={[0.482, 0.247, 0.894]}
        // Yoğunluk ölçülerek seçildi: sayfa ortalaması 234.9'dan 230.8'e iner,
        // metin kontrastı bozulmadan yüzey dokusu okunur.
        alphaScale={light ? 0.28 : 1}
        density={light ? 1.25 : 1}
        glowIntensity={light ? 0.18 : 0.3}
        twinkleIntensity={light ? 0.12 : 0.35}
        saturation={light ? 0 : 0.75}
        hueShift={265}
        rotationSpeed={0.04}
        starSpeed={0.28}
        speed={0.7}
        mouseRepulsion={false}
        mouseInteraction
      />
    </div>
  );
}

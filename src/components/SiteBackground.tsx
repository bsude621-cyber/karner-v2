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
        inkColor={[0.1, 0.11, 0.14]}
        // Bu iki sayı ölçülerek seçildi. Aydınlıkta hedef, karanlık modun
        // inceliğini eşlemek: koyu modda pikselin ~%14'ü zeminden ayrışıyor.
        // glow .18 + alfa .2 aydınlıkta ~%32 doku verirken sayfanın ortalama
        // parlaklığını 234.9'dan yalnızca 230.7'ye indiriyor — metin kontrastı
        // bozulmadan yüzey dokusu okunuyor. Alfayı .3'e çıkarmak dokuyu %53'e
        // fırlatıp sayfayı gri bir perdenin altına sokuyor.
        alphaScale={light ? 0.2 : 1}
        density={light ? 1.25 : 1}
        glowIntensity={light ? 0.18 : 0.3}
        twinkleIntensity={light ? 0.12 : 0.35}
        saturation={light ? 0 : 0.35}
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

"use client";

import dynamic from "next/dynamic";
import { useIsLight } from "@/lib/use-theme";

// WebGL yalnızca tarayıcıda, kritik render yolunun dışında.
const Galaxy = dynamic(
  () => import("@/components/ui/galaxy").then((m) => ({ default: m.Galaxy })),
  { ssr: false }
);

/**
 * AYDINLIK MODA ÖZEL sabit yıldız alanı — sayfa bunun üzerinde kayar.
 *
 * Karanlık modda hiç kurulmaz: orada bölüme özel sahneler (AboutTeaser /
 * AboutSection'daki DottedSurface, Hizmetler'deki SpaceBackground) kendi
 * işlerini görüyor ve o görünüm korunuyor.
 *
 * Neden aydınlıkta ayrı bir çözüm gerekti: ışıyan bir yıldız açık zeminde
 * parlayamaz, zeminden parlak olamaz. Bu yüzden burada `inkMode` kullanılır —
 * renk sabit, alfa yoğunluğu taşır: sönük yıldız hafif tane, parlak çekirdek
 * koyu nokta. Yüzey dokusu okunur, ışıma değil.
 */
export default function SiteBackground() {
  const light = useIsLight();
  if (!light) return null;

  return (
    // Zemin rengini <body> boyuyor (background: var(--background)); bu katman
    // yalnızca taneleri taşır, kendi zemini yok.
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Galaxy
        inkMode
        // Marka moru, tam canlılıkta. Zemin artık uzay grisi (#d6dae1) olduğu
        // için mor beyazımsı-lilaya kaçmıyor, doğrudan mor okunuyor.
        inkColor={[0.482, 0.247, 0.894]}
        alphaScale={0.34}
        density={1.25}
        glowIntensity={0.22}
        // "Canlı" olan kısım bu: taneler nefes alıyor (önceki .12 neredeyse
        // sabitti). Uzay hissi hareketten geliyor.
        twinkleIntensity={0.45}
        saturation={0}
        rotationSpeed={0.04}
        starSpeed={0.28}
        speed={0.7}
        mouseRepulsion={false}
        mouseInteraction
      />
    </div>
  );
}

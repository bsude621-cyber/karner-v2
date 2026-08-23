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
        // Gri-menekşe: marka morunun uzay grisine çekilmiş hâli. Saf mor
        // (#7b3fe4) açık zeminde beyazımsı-lila okunuyordu; bu ton morluk
        // ölçüsünü 9.3'ten 6.5'e indiriyor (saf gri referansı 6.1).
        inkColor={[0.42, 0.396, 0.502]}
        // Gri-menekşe mordan daha sönük olduğu için alfa .28 → .34 ile
        // yoğunluk sabit tutuldu: görünürlük %33.5, sayfa ortalaması 230.4
        // (önceki 31.1 / 230.8). Metin kontrastı bozulmuyor.
        alphaScale={0.34}
        density={1.25}
        glowIntensity={0.18}
        twinkleIntensity={0.12}
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

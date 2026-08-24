"use client";

import { unstable_catchError, type ErrorInfo } from "next/error";
import type { ReactNode } from "react";

/**
 * Süs bileşenleri için sessiz hata sınırı.
 *
 * SORUN: Sitede hiçbir hata sınırı yoktu. Hero shader'ı, 3B robotlar, yıldız
 * alanı, imleç, asistan — hepsi tarayıcıya bağımlı (WebGL, GPU belleği, model
 * indirme). Bunlardan HERHANGİ biri tek bir kare içinde hata fırlattığında React
 * ağacı en tepeye kadar sökülüyor ve Next.js üretim modunda sayfanın yerine
 * "Application error: a client-side exception has occurred" koyuyordu —
 * tarayıcı Türkçeye çevirince kullanıcının gördüğü "web sitesinde bir hata
 * oluştu" ekranı tam olarak buydu. Yani ekrandaki tek bir dekoratif katman,
 * metni de menüyü de iletişim formunu da beraberinde götürüyordu.
 *
 * ÇÖZÜM: Her ağır/isteğe bağlı katman kendi sınırının içinde çalışır. Patlarsa
 * yalnızca o katman kaybolur (varsayılan yedek: hiçbir şey), sayfanın geri
 * kalanı — asıl içerik — ayakta kalır.
 *
 * Next 16'nın `unstable_catchError`'ü kullanılıyor (elle yazılmış bir React
 * sınıf sınırı yerine): `redirect()` / `notFound()` gibi çerçevenin hata
 * fırlatarak çalışan API'lerini yanlışlıkla yutmuyor ve sayfa değiştirince hata
 * durumu kendiliğinden temizleniyor. İsim `unstable_` önekli — Next sürümü
 * yükseltilirken bu satır kontrol edilmeli (bkz. next/dist/docs .../catchError.md).
 */

type Props = {
  /** Hata ayıklama için katman adı — konsola bu adla yazılır. */
  name?: string;
  /** Hata durumunda gösterilecek yedek. Süsler için varsayılan: hiçbir şey. */
  fallback?: ReactNode;
};

function SilentFallback(props: Props, { error }: ErrorInfo) {
  // Sessizce düşer ama izsiz değil: konsolda hangi katmanın çöktüğü yazar,
  // böylece canlıda "neden robotlar yok" sorusunun cevabı bir tık uzakta olur.
  if (typeof console !== "undefined") {
    console.warn(
      `[KARNER] "${props.name ?? "süs katmanı"}" yüklenemedi, sayfanın kalanı etkilenmedi:`,
      error?.message ?? error,
    );
  }
  return <>{props.fallback ?? null}</>;
}

const SafeBoundary = unstable_catchError(SilentFallback);

export default SafeBoundary;

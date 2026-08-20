/**
 * Sayfa tarihleri — sitemap lastmod + schema datePublished/dateModified +
 * görünür "Güncellendi" satırı buradan beslenir.
 *
 * Kural: tarih GERÇEK son içerik değişikliğini gösterir; build tarihi
 * yazılmaz (her build'de "bugün" yazan sitemap arama motoru için gürültüdür).
 * Bir sayfanın içeriği değişince buradaki modified güncellenir.
 */
export type PageDates = { published: string; modified: string };

export const PAGE_DATES: Record<string, PageDates> = {
  "/": { published: "2026-08-11", modified: "2026-08-20" },
  "/hakkimizda": { published: "2026-08-18", modified: "2026-08-20" },
  "/hizmetler": { published: "2026-08-20", modified: "2026-08-20" },
  "/3d-web-sitesi": { published: "2026-08-18", modified: "2026-08-20" },
  "/yapay-zeka-reklam-videosu": { published: "2026-08-18", modified: "2026-08-20" },
  "/yapay-zeka-aramasinda-gorunmek": { published: "2026-08-18", modified: "2026-08-20" },
  "/hizmetler/web-sitesi-gelistirme": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/mobil-uygulama": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/ai-video-reklam": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/ai-urun-gorseli": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/seo-geo-aeo": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/otomasyon-sistemleri": { published: "2026-08-11", modified: "2026-08-20" },
  "/hizmetler/marka-grafik-tasarim": { published: "2026-08-11", modified: "2026-08-20" },
};

export function pageDates(path: string): PageDates {
  return PAGE_DATES[path] ?? { published: "2026-08-11", modified: "2026-08-20" };
}

/** "20 Ağustos 2026" biçimi — görünür tarih için. */
export function formatTr(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Site geneli sabitler — SEO/GEO/AEO altyapısının tek doğruluk kaynağı.
 *
 * DİKKAT: Domain henüz alınmadı. Canlıya çıkmadan önce NEXT_PUBLIC_SITE_URL
 * ortam değişkenini gerçek domainle set et — canonical, sitemap, og:url,
 * robots ve llms.txt hepsi buradan beslenir.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karner.example";

export const SITE_NAME = "KARNER";

export const CONTACT = {
  email: "karneryazilim@gmail.com",
  /** E.164 — schema.org için boşluksuz */
  phoneE164: "+905442188645",
  /** Ekranda gösterilen biçim */
  phoneDisplay: "0544 218 8645",
} as const;

export const ORG_DESCRIPTION =
  "KARNER; yazılım ve medyayı aynı çatıda birleştiren, Türkiye genelinde hizmet veren dijital stüdyo. 3D web sitesi, mobil uygulama, AI video, SEO/GEO/AEO, otomasyon ve marka tasarımı.";

export const KNOWS_ABOUT = [
  "Web sitesi geliştirme",
  "3D web sitesi",
  "Mobil uygulama geliştirme",
  "AI video üretimi",
  "AI ürün görseli",
  "SEO",
  "GEO (Generatif Arama Optimizasyonu)",
  "AEO (Cevap Motoru Optimizasyonu)",
  "İş akışı otomasyonu",
  "Marka ve grafik tasarım",
] as const;

/** Organization düğümü — @id ile diğer schema'lardan referans alınır. */
export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-emblem-192.png`,
      width: 192,
      height: 192,
    },
    description: ORG_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "Muğla" },
      { "@type": "City", name: "Ankara" },
    ],
    knowsAbout: [...KNOWS_ABOUT],
  };
}

/** WebSite düğümü — Organization'a @id ile bağlanır. */
export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "tr",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

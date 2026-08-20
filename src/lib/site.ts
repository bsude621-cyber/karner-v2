/**
 * Site geneli sabitler — SEO/GEO/AEO altyapısının tek doğruluk kaynağı.
 *
 * DİKKAT: Canlıya çıkmadan önce NEXT_PUBLIC_SITE_URL ortam değişkenini gerçek
 * domainle (https://karneryazilim.com) set et — canonical, sitemap, og:url,
 * robots ve llms.txt hepsi buradan beslenir.
 */
// trim: env değeri satır sonu/boşlukla gelirse new URL() build'i düşürüyor
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karner.example"
)
  .trim()
  .replace(/\/+$/, "");

export const SITE_NAME = "KARNER";

/** Tek cümlelik marka tanımı — entity disambiguation (görünür metin + schema aynı cümle). */
export const BRAND_SENTENCE =
  "KARNER; Muğla ve Ankara merkezli, Türkiye genelinde hizmet veren bir yazılım ve medya ajansıdır.";

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
  "Sosyal medya içerik yönetimi",
] as const;

/**
 * Doğrulanmış dış profiller — sameAs. Yalnızca gerçekten var olan ve
 * KARNER'a ait hesaplar; tahminle URL yazılmaz. (LinkedIn / Instagram
 * hesapları açılınca buraya eklenir.)
 */
export const SAME_AS = ["https://github.com/bsude621-cyber"] as const;

/** Kurucu ekip — Person düğümleri (E-E-A-T: kim yazıyor, kim üretiyor). */
export const PEOPLE = [
  {
    id: "sude",
    name: "Sude",
    jobTitle: "Kurucu Ortak — Strateji, İçerik ve Medya",
    description:
      "KARNER'ın kurucu ortağı; strateji, içerik, müşteri ilişkileri ve yapay zekâ destekli medya üretiminden sorumlu.",
  },
  {
    id: "beyza",
    name: "Beyza",
    jobTitle: "Kurucu Ortak — Geliştirme ve Mimari",
    description:
      "KARNER'ın kurucu ortağı; web ve mobil geliştirme ile teknik mimariden sorumlu.",
  },
] as const;

export function personId(id: string) {
  return `${SITE_URL}/hakkimizda#${id}`;
}

export function peopleJsonLd() {
  return PEOPLE.map((p) => ({
    "@type": "Person",
    "@id": personId(p.id),
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/hakkimizda`,
  }));
}

/** Organization düğümü — @id ile diğer schema'lardan referans alınır. */
export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "KARNER Yazılım ve Medya",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo-emblem-512.png`,
      contentUrl: `${SITE_URL}/logo-emblem-512.png`,
      width: 512,
      height: 512,
      caption: "KARNER logo",
    },
    image: { "@id": `${SITE_URL}/#logo` },
    description: ORG_DESCRIPTION,
    slogan: "Yazılım ve Medya",
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        availableLanguage: ["tr"],
        areaServed: "TR",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "Muğla" },
      { "@type": "City", name: "Ankara" },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    knowsLanguage: ["tr"],
    founder: PEOPLE.map((p) => ({ "@id": personId(p.id) })),
    sameAs: [...SAME_AS],
  };
}

/** WebSite düğümü — Organization'a @id ile bağlanır. */
export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "KARNER Yazılım ve Medya Ajansı",
    description: ORG_DESCRIPTION,
    inLanguage: "tr",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** BreadcrumbList — görünür Breadcrumb bileşeniyle aynı veriden üretilir. */
export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(pageUrl: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href.startsWith("http") ? c.href : `${SITE_URL}${c.href}`,
    })),
  };
}

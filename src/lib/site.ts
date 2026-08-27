/**
 * Site geneli sabitler — SEO/GEO/AEO altyapısının tek doğruluk kaynağı.
 * canonical, sitemap, og:url, robots ve llms.txt hepsi SITE_URL'den beslenir.
 *
 * Varsayılan artık gerçek domain (2026-08-24, canlıya çıkış). Önceden
 * "karner.example" placeholder'ıydı: NEXT_PUBLIC_SITE_URL unutulur veya
 * silinirse site sessizce yanlış canonical yayınlıyordu ve bu, arama
 * motorlarının siteyi yanlış adrese sabitlemesi demek. Artık env değişkeni
 * yalnızca ÖNİZLEME dağıtımlarını gerçek domainden ayırmak için gerekli.
 */
// trim: env değeri satır sonu/boşlukla gelirse new URL() build'i düşürüyor
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karneryazilim.com"
)
  .trim()
  .replace(/\/+$/, "");

export const SITE_NAME = "KARNER";

/** Tek cümlelik marka tanımı — entity disambiguation (görünür metin + schema aynı cümle). */
export const BRAND_SENTENCE =
  "KARNER; Türkiye genelinde hizmet veren bir yazılım ve medya ajansıdır.";

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
 * hesapları 2026-08-27 Sude verdi.)
 */
export const SOCIAL_PROFILES = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/karner-yazilim-ve-medya-10b937418/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/karneryazilim/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@karnerlab" },
  { id: "github", label: "GitHub", href: "https://github.com/bsude621-cyber" },
] as const;

export const SAME_AS = SOCIAL_PROFILES.map((p) => p.href);

/**
 * Ekip — İSİMSİZ (Sude 2026-08-21: "kişi kişi isim vermeyelim").
 * Person düğümü / kurucu adı yayınlanmaz; roller kurumsal olarak anlatılır.
 */
export const TEAM_ROLES = [
  {
    id: "strateji-medya",
    role: "Strateji, içerik ve medya",
    description:
      "Hedef ve mesajın netleştirilmesi, içerik ve yapay zekâ destekli video/görsel üretimi, müşteri ilişkileri.",
  },
  {
    id: "gelistirme-mimari",
    role: "Geliştirme ve teknik mimari",
    description:
      "Web ve mobil geliştirme, performans, yapısal veri ve otomasyon altyapısı.",
  },
  {
    id: "teknik-danismanlik",
    role: "Teknik danışmanlık",
    description: "Mimari kararlar ve güvenlik konularında ihtiyaç hâlinde destek.",
  },
] as const;

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
    areaServed: [{ "@type": "Country", name: "Türkiye" }],
    knowsAbout: [...KNOWS_ABOUT],
    knowsLanguage: ["tr"],
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

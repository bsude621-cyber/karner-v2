/**
 * Rehber (spoke) içerik modeli — /rehber/[slug] sayfaları buradan render edilir.
 *
 * Kural: yalnızca genel teknik/sektör bilgisi ve belgeli KARNER gerçeği.
 * Fiyat, süre garantisi, sayı/yüzde iddiası, sertifika, müşteri sözü YAZILMAZ.
 * Metin içinde **kalın** ve [bağlantı](/yol) biçimi desteklenir.
 */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "dl"; items: { term: string; def: string }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

export type GuideCluster = "geo" | "web" | "otomasyon" | "video" | "mobil" | "sosyal";

export type Guide = {
  slug: string;
  /** Görünür H1 */
  title: string;
  /** SERP başlığı 50-60 karakter, marka eki dâhil */
  seoTitle: string;
  /** SERP açıklaması 140-160 karakter */
  seoDescription: string;
  /** TL;DR — 1-3 cümle, kalın basılır, speakable */
  summary: string;
  cluster: GuideCluster;
  /** Bağlı ana rehber (pillar) */
  pillar: { href: string; label: string };
  /** İlgili hizmet slug'ı (hizmetler/[slug]) */
  serviceSlug: string;
  blocks: GuideBlock[];
  faq: { q: string; a: string }[];
  /** İlgili rehber slug'ları (aynı veya komşu küme) */
  related: string[];
  published: string;
  modified: string;
};

export const CLUSTER_LABEL: Record<GuideCluster, string> = {
  geo: "Yapay zekâ araması ve SEO",
  web: "Web sitesi",
  otomasyon: "Otomasyon",
  video: "AI video ve reklam",
  mobil: "Mobil uygulama",
  sosyal: "Sosyal medya",
};

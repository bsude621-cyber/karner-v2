import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { PAGE_DATES } from "@/data/dates";
import { SITE_URL } from "@/lib/site";
import { guides } from "@/data/guides";
import { sectors } from "@/data/sectors";
import { cases } from "@/data/cases";

/**
 * lastmod = sayfanın GERÇEK son içerik değişikliği (data/dates.ts).
 * Her build'de "bugün" yazmak arama motoru için anlamsız gürültüdür;
 * gerçek tarih, değişen sayfanın yeniden taranmasını öne alır.
 */
const lm = (path: string) => new Date(PAGE_DATES[path]?.modified ?? "2026-08-11");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: lm("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/hizmetler`,
      lastModified: lm("/hizmetler"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified: lm("/hakkimizda"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/3d-web-sitesi`,
      lastModified: lm("/3d-web-sitesi"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/yapay-zeka-reklam-videosu`,
      lastModified: lm("/yapay-zeka-reklam-videosu"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/yapay-zeka-aramasinda-gorunmek`,
      lastModified: lm("/yapay-zeka-aramasinda-gorunmek"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${SITE_URL}/hizmetler/${s.slug}`,
      lastModified: lm(`/hizmetler/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${s.imageSrc}`],
    })),
    ...["/rehber", "/isler", "/sektor", "/surec", "/paketler", "/iletisim"].map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: lm(p),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/gizlilik`,
      lastModified: lm("/gizlilik"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...guides.map((g) => ({
      url: `${SITE_URL}/rehber/${g.slug}`,
      lastModified: new Date(g.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...sectors.map((x) => ({
      url: `${SITE_URL}/sektor/${x.slug}`,
      lastModified: new Date(x.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cases.map((c) => ({
      url: `${SITE_URL}/isler/${c.slug}`,
      lastModified: new Date(c.modified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${c.image.src}`],
    })),
  ];
}

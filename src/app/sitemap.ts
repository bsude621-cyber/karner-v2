import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { PAGE_DATES } from "@/data/dates";
import { SITE_URL } from "@/lib/site";

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
  ];
}

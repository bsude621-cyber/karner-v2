import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/3d-web-sitesi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${SITE_URL}/hizmetler/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}

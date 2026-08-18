import type { MetadataRoute } from "next";
import { ORG_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Yazılım ve Medya`,
    short_name: SITE_NAME,
    description: ORG_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#05060a",
    icons: [
      {
        src: "/logo-emblem.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

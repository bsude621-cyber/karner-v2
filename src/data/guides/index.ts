import type { Guide, GuideCluster } from "./types";
import { GEO_GUIDES } from "./geo";
import { WEB_GUIDES } from "./web";
import { MOBIL_GUIDES } from "./mobil";
import { OTOMASYON_GUIDES } from "./otomasyon";
import { VIDEO_GUIDES } from "./video";
import { SOSYAL_GUIDES } from "./sosyal";

export const guides: Guide[] = [
  ...GEO_GUIDES,
  ...WEB_GUIDES,
  ...OTOMASYON_GUIDES,
  ...VIDEO_GUIDES,
  ...MOBIL_GUIDES,
  ...SOSYAL_GUIDES,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCluster(cluster: GuideCluster): Guide[] {
  return guides.filter((g) => g.cluster === cluster);
}

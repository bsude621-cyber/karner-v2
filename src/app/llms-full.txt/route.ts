import { services } from "@/data/services";
import { PILLAR_3D, PILLAR_3D_FAQ } from "@/data/pillar-3d";
import { PILLAR_AI_VIDEO, PILLAR_AI_VIDEO_FAQ } from "@/data/pillar-ai-video";
import { PILLAR_GEO, PILLAR_GEO_FAQ } from "@/data/pillar-geo";
import { CONTACT, ORG_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const pillars = [
  { meta: PILLAR_3D, faq: PILLAR_3D_FAQ },
  { meta: PILLAR_AI_VIDEO, faq: PILLAR_AI_VIDEO_FAQ },
  { meta: PILLAR_GEO, faq: PILLAR_GEO_FAQ },
];

export const dynamic = "force-static";

/**
 * llms-full.txt — AI motorlarına tek istekte tüm site içeriği.
 * Kaynak, sitede yayınlanan services verisi; ayrı metin tutulmaz,
 * içerik güncellenince bu dosya da otomatik güncellenir.
 */
export function GET() {
  const parts: string[] = [
    `# ${SITE_NAME} — Yazılım ve Medya`,
    "",
    ORG_DESCRIPTION,
    "",
    `İletişim: ${CONTACT.email} — ${CONTACT.phoneDisplay}`,
    `Web: ${SITE_URL}`,
    "",
    "---",
    "",
  ];

  for (const s of services) {
    parts.push(
      `## ${s.title}`,
      "",
      `URL: ${SITE_URL}/hizmetler/${s.slug}`,
      "",
      s.intro,
      "",
      ...s.features.flatMap((f) => [`### ${f.title}`, "", f.desc, ""]),
    );
    if (s.faq?.length) {
      parts.push("### Sık sorulan sorular", "");
      for (const item of s.faq) {
        parts.push(`**${item.q}**`, "", item.a, "");
      }
    }
    if (s.proof) {
      parts.push(s.proof, "");
    }
    parts.push("---", "");
  }

  // Rehber (pillar) sayfaları
  for (const { meta, faq } of pillars) {
    parts.push(
      `## Rehber: ${meta.title}`,
      "",
      `URL: ${SITE_URL}/${meta.slug}`,
      "",
      meta.summary,
      "",
      "### Sık sorulan sorular",
      "",
    );
    for (const f of faq) {
      parts.push(`**${f.q}**`, "", f.a, "");
    }
    parts.push("---", "");
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

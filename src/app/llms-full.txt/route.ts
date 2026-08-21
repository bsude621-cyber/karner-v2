import { services } from "@/data/services";
import { PILLAR_3D, PILLAR_3D_FAQ } from "@/data/pillar-3d";
import { PILLAR_AI_VIDEO, PILLAR_AI_VIDEO_FAQ } from "@/data/pillar-ai-video";
import { PILLAR_GEO, PILLAR_GEO_FAQ } from "@/data/pillar-geo";
import { BRAND_SENTENCE, CONTACT, ORG_DESCRIPTION, SITE_NAME, SITE_URL, TEAM_ROLES } from "@/lib/site";
import { HOME_FAQ } from "@/data/home-faq";
import { guides } from "@/data/guides";
import { cases } from "@/data/cases";
import { sectors } from "@/data/sectors";
import { PROCESS_STEPS } from "@/data/process";
import { PACKAGE_CATEGORIES, PACKAGE_FAQ } from "@/data/packages";
import type { GuideBlock } from "@/data/guides/types";
import { PAGE_DATES } from "@/data/dates";

const pillars = [
  { meta: PILLAR_3D, faq: PILLAR_3D_FAQ },
  { meta: PILLAR_AI_VIDEO, faq: PILLAR_AI_VIDEO_FAQ },
  { meta: PILLAR_GEO, faq: PILLAR_GEO_FAQ },
];

export const dynamic = "force-static";

/** İçerik bloklarını düz metne çevirir (llms-full). */
function blocksToText(blocks: readonly GuideBlock[]): string[] {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h2": out.push(`### ${b.text}`, ""); break;
      case "h3": out.push(`#### ${b.text}`, ""); break;
      case "p": out.push(b.text, ""); break;
      case "ul": out.push(...b.items.map((i) => `- ${i}`), ""); break;
      case "ol": out.push(...b.items.map((i, k) => `${k + 1}. ${i}`), ""); break;
      case "dl": out.push(...b.items.map((i) => `- **${i.term}**: ${i.def}`), ""); break;
      case "table":
        out.push(`| ${b.head.join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`, ...b.rows.map((r) => `| ${r.join(" | ")} |`), "");
        break;
      case "callout": out.push(`> ${b.title ? b.title + ": " : ""}${b.text}`, ""); break;
    }
  }
  return out;
}

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
    BRAND_SENTENCE,
    "",
    `İletişim: ${CONTACT.email} — ${CONTACT.phoneDisplay}`,
    `Web: ${SITE_URL}`,
    `Son güncelleme: ${PAGE_DATES["/"].modified}`,
    "",
    "## Ekip",
    "",
    "Ekip sorumluluk alanlarına göre çalışır:",
    ...TEAM_ROLES.map((r) => `- ${r.role}: ${r.description}`),
    "",
    "## Sık sorulan sorular (genel)",
    "",
    ...HOME_FAQ.flatMap((f) => [`**${f.q}**`, "", f.a, ""]),
    "---",
    "",
  ];

  for (const s of services) {
    parts.push(
      `## ${s.title}`,
      "",
      `URL: ${SITE_URL}/hizmetler/${s.slug}`,
      `Güncelleme: ${PAGE_DATES[`/hizmetler/${s.slug}`]?.modified ?? ""}`,
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
      `Güncelleme: ${PAGE_DATES[`/${meta.slug}`]?.modified ?? ""}`,
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

  // Konu rehberleri (spoke)
  for (const g of guides) {
    parts.push(`## Rehber: ${g.title}`, "", `URL: ${SITE_URL}/rehber/${g.slug}`, `Güncelleme: ${g.modified}`, "", g.summary, "");
    parts.push(...blocksToText(g.blocks));
    parts.push("### Sık sorulan sorular", "");
    for (const f of g.faq) parts.push(`**${f.q}**`, "", f.a, "");
    parts.push("---", "");
  }

  // İşler (projeler)
  for (const c of cases) {
    parts.push(`## İş: ${c.client} — ${c.sector} (${c.location})`, "", `URL: ${SITE_URL}/isler/${c.slug}`, c.url ? `Site: ${c.url}` : "", `Güncelleme: ${c.modified}`, "", c.summary, "");
    parts.push(...c.facts.map((f) => `- ${f.label}: ${f.value}`), "");
    parts.push(...blocksToText(c.blocks));
    if (c.disclosure) parts.push(c.disclosure, "");
    for (const f of c.faq) parts.push(`**${f.q}**`, "", f.a, "");
    parts.push("---", "");
  }

  // Sektörler
  for (const x of sectors) {
    parts.push(`## Sektör: ${x.name}`, "", `URL: ${SITE_URL}/sektor/${x.slug}`, "", x.summary, "");
    parts.push(...blocksToText(x.blocks));
    for (const f of x.faq) parts.push(`**${f.q}**`, "", f.a, "");
    parts.push("---", "");
  }

  // Süreç
  parts.push("## Süreç: nasıl çalışıyoruz?", "", `URL: ${SITE_URL}/surec`, "");
  for (const st of PROCESS_STEPS) {
    parts.push(`### ${st.no} ${st.name} — çıktı: ${st.output}`, "", st.text, "", ...st.detail.map((d) => `- ${d}`), "");
  }
  parts.push("---", "");

  // Paketler (fiyat yazılmaz; teklif keşif sonrası yazılı)
  parts.push("## Hizmet paketleri — kapsam çerçevesi; fiyat keşif sonrası yazılı teklifle", "", `URL: ${SITE_URL}/paketler`, "");
  for (const cat of PACKAGE_CATEGORIES) {
    parts.push(`### ${cat.name}`, "", cat.intro, "");
    for (const t of cat.tiers) {
      parts.push(`#### ${t.name} — ${t.tagline}`, "", `Kim için: ${t.audience}`, "", ...t.includes.map((i) => `- ${i}`), "", `Dahil olmayan: ${t.excludes.join(", ")}`, "");
      if (t.guarantee) parts.push(`Taahhüt: ${t.guarantee.yes.join("; ")} — Verilmez: ${t.guarantee.no.join("; ")}`, "");
    }
  }
  for (const f of PACKAGE_FAQ) parts.push(`**${f.q}**`, "", f.a, "");
  parts.push("---", "");

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

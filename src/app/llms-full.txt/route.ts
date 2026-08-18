import { services } from "@/data/services";
import { CONTACT, ORG_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

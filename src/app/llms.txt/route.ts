import { services } from "@/data/services";
import { CONTACT, ORG_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt — AI arama motorları için kısa site haritası (llmstxt.org spec). */
export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${ORG_DESCRIPTION}`,
    "",
    `İletişim: ${CONTACT.email} — ${CONTACT.phoneDisplay}`,
    "",
    "## Hizmetler",
    "",
    ...services.map(
      (s) => `- [${s.title}](${SITE_URL}/hizmetler/${s.slug}): ${s.summary}`,
    ),
    "",
    "## Rehberler",
    "",
    `- [3D Web Sitesi](${SITE_URL}/3d-web-sitesi): 3D web sitesi nedir, kimlere uygun, hız ve SEO ilişkisi, üretim süreci`,
    "",
    "## Kurumsal",
    "",
    `- [Hakkımızda](${SITE_URL}/hakkimizda): KARNER kimdir, ekip ve çalışma biçimi`,
    "",
    "## Tam içerik",
    "",
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Tüm hizmet içeriği tek dosyada`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

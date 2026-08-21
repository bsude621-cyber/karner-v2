import { services } from "@/data/services";
import { guides } from "@/data/guides";
import { cases } from "@/data/cases";
import { sectors } from "@/data/sectors";
import { BRAND_SENTENCE, CONTACT, ORG_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt — AI arama motorları için kısa site haritası (llmstxt.org spec). */
export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${ORG_DESCRIPTION}`,
    "",
    BRAND_SENTENCE,
    "",
    `İletişim: ${CONTACT.email} — ${CONTACT.phoneDisplay}`,
    "",
    "## Hizmetler",
    "",
    `- [Tüm hizmetler](${SITE_URL}/hizmetler): Sekiz hizmet alanının özeti ve rehber bağlantıları`,
    ...services.map(
      (s) => `- [${s.title}](${SITE_URL}/hizmetler/${s.slug}): ${s.summary}`,
    ),
    "",
    "## Rehber",
    "",
    `- [3D Web Sitesi](${SITE_URL}/3d-web-sitesi): 3D web sitesi nedir, kimlere uygun, hız ve SEO ilişkisi, üretim süreci`,
    `- [Yapay Zekâ ile Reklam Videosu](${SITE_URL}/yapay-zeka-reklam-videosu): AI reklam videosu nedir, klasik prodüksiyondan farkı, üretim süreci`,
    `- [Yapay Zekâ Aramasında Görünmek](${SITE_URL}/yapay-zeka-aramasinda-gorunmek): ChatGPT/Gemini/Perplexity'de kaynak seçilme mühendisliği (GEO)`,
    "",
    "## Konu rehberleri",
    "",
    `- [Tüm rehberler](${SITE_URL}/rehber)`,
    ...guides.map((g) => `- [${g.title}](${SITE_URL}/rehber/${g.slug}): ${g.seoDescription}`),
    "",
    "## İşler (projeler)",
    "",
    `- [İşlerimiz](${SITE_URL}/isler)`,
    ...cases.map((c) => `- [${c.client}](${SITE_URL}/isler/${c.slug}): ${c.sector}, ${c.location}`),
    "",
    "## Sektörler",
    "",
    `- [Sektörler](${SITE_URL}/sektor)`,
    ...sectors.map((x) => `- [${x.name}](${SITE_URL}/sektor/${x.slug}): ${x.seoDescription}`),
    "",
    "## Kurumsal",
    "",
    `- [Hakkımızda](${SITE_URL}/hakkimizda): KARNER kimdir, ekip ve çalışma biçimi`,
    `- [Süreç](${SITE_URL}/surec): keşif, tasarım, kurulum, ölçüm — dört adım`,
    `- [Paketler](${SITE_URL}/paketler): her hizmette Başlangıç / Standart / Pro — kapsam dâhil/hariç listeleri, fiyat keşif sonrası yazılı teklifle`,
    `- [İletişim](${SITE_URL}/iletisim)`,
    `- [Gizlilik / KVKK](${SITE_URL}/gizlilik)`,
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

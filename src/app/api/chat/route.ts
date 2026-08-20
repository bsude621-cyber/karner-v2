import { NextRequest, NextResponse } from "next/server";
import { services } from "@/data/services";
import { HOME_FAQ } from "@/data/home-faq";
import { PACKAGE_CATEGORIES, PACKAGE_FAQ } from "@/data/packages";
import { PROCESS_STEPS } from "@/data/process";
import { cases } from "@/data/cases";
import { guides } from "@/data/guides";
import { BRAND_SENTENCE } from "@/lib/site";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

/** Bot'un bildiği her şey site içeriğinden türetilir — uydurma bilgi yasak. */
const SYSTEM_PROMPT = `Sen KARNER Asistan'sın — KARNER Yazılım ve Medya Şirketi'nin web sitesindeki yardımcı sohbet botusun.

## Şirket
${BRAND_SENTENCE} Web sitesi, mobil uygulama, AI video/reklam, AI ürün görseli, SEO/GEO/AEO, otomasyon sistemleri ve marka/grafik tasarım hizmetleri verir. Kurucu ortaklar: Sude (strateji, içerik, medya) ve Beyza (geliştirme, mimari).

## Hizmetler
${services
  .map(
    (s) =>
      `### ${s.title}\n${s.intro}\nÖne çıkanlar: ${s.features
        .map((f) => f.title)
        .join(", ")}.${s.proof ? `\n${s.proof}` : ""}`,
  )
  .join("\n\n")}

## Süreç (4 adım)
${PROCESS_STEPS.map((p) => `${p.no} ${p.name}: ${p.text}`).join("\n")}

## Hizmet paketleri (kapsam çerçevesi — FİYAT YOK; teklif keşif sonrası yazılı; sayfa: /paketler)
${PACKAGE_CATEGORIES.map((c) => `- ${c.name}: ${c.tiers.map((t) => `${t.name} (${t.tagline})`).join(" · ")}`).join("\n")}
Paket SSS: ${PACKAGE_FAQ.map((f) => `${f.q} ${f.a}`).join(" ")}

## Gerçek işler (sayfa: /isler)
${cases.map((c) => `- ${c.client} (${c.location}): ${c.summary}`).join("\n")}

## Genel SSS
${HOME_FAQ.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Rehberler (konu sorulursa ilgili sayfaya yönlendir)
${guides.map((g) => `- /rehber/${g.slug}: ${g.title}`).join("\n")}

## İletişim
- Telefon: 0544 218 8645
- E-posta: karneryazilim@gmail.com
- Sitedeki İletişim bölümünden form doldurulabilir.

## Kurallar
1. SADECE Türkçe yanıt ver. Kısa tut: en fazla 3-4 cümle.
2. Burada YAZMAYAN hiçbir bilgiyi (fiyat, süre, müşteri sayısı, yıl deneyimi, sertifika, sonuç yüzdesi) ASLA verme ve uydurma. Fiyat sorulursa: fiyatın kapsama göre keşif görüşmesi sonrası yazılı teklifle verildiğini söyle, /paketler sayfasındaki kapsamlara ve iletişime yönlendir.
3. Bilmediğin bir şey sorulursa dürüstçe bilmediğini söyle, iletişime yönlendir.
4. Konu dışı isteklere (kod yazma, ödev, genel sohbet dışı talepler) kibarca hizmetlere dön.
5. Samimi, profesyonel ve yardımsever ol; abartılı pazarlama dili kullanma.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Asistan şu anda yapılandırılmamış." },
      { status: 503 },
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Kötüye kullanım sınırları: son 12 mesaj, mesaj başına 500 karakter
  const trimmed = messages
    .slice(-12)
    .filter(
      (m): m is ChatMessage =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string",
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      // gpt-oss akıl yürütme tokenlarını da bu bütçeden harcar — payı geniş tut
      max_tokens: 600,
      reasoning_effort: "low",
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Asistan şu anda yanıt veremiyor." },
      { status: 502 },
    );
  }

  const data = await res.json();
  const reply: string =
    data.choices?.[0]?.message?.content?.trim() ??
    "Üzgünüm, şu anda yanıt veremiyorum.";

  return NextResponse.json({ reply });
}

import { NextRequest, NextResponse, after } from "next/server";
import { services } from "@/data/services";
import { HOME_FAQ } from "@/data/home-faq";
import { PACKAGE_CATEGORIES, PACKAGE_FAQ } from "@/data/packages";
import { PROCESS_STEPS } from "@/data/process";
import { cases } from "@/data/cases";
import { guides } from "@/data/guides";
import { BRAND_SENTENCE } from "@/lib/site";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Bilgi tabanı — site içeriğinden türetilir (uydurma bilgi yasak).
 *
 * Groq ücretsiz katman: gpt-oss-120b için 8.000 token/dakika (TPM). Tüm siteyi
 * her istekte göndermek 12k token ediyordu → 413. Çözüm: temel bilgi her zaman,
 * ayrıntılar ziyaretçinin sorusuna göre seçilerek eklenir (≈2-3k token/istek).
 */
const norm = (t: string) =>
  t
    .toLocaleLowerCase("tr")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u");

/** Hizmet → tetikleyici kelimeler (normalize edilmiş). */
const SERVICE_KEYS: Record<string, string[]> = {
  "web-sitesi-gelistirme": ["web", "site", "sayfa", "3d", "landing", "wordpress", "domain", "hosting"],
  "mobil-uygulama": ["mobil", "uygulama", "app", "ios", "android", "expo", "market"],
  "ai-video-reklam": ["video", "reklam", "reels", "film", "klip", "veo", "kling"],
  "ai-urun-gorseli": ["gorsel", "foto", "urun", "try-on", "tryon", "manken", "katalog"],
  "seo-geo-aeo": ["seo", "geo", "aeo", "google", "arama", "chatgpt", "gemini", "siralama", "gorun", "harita", "isletme profili", "gbp"],
  "otomasyon-sistemleri": ["otomasyon", "n8n", "bot", "telegram", "whatsapp", "randevu", "akis", "entegrasyon", "crm"],
  "marka-grafik-tasarim": ["logo", "marka", "kimlik", "grafik", "tasarim", "kurumsal kimlik", "sablon"],
  "sosyal-medya-icerik-yonetimi": ["sosyal", "instagram", "tiktok", "linkedin", "icerik", "post", "takvim", "paylasim"],
};

function pickServices(q: string): string[] {
  const hits: string[] = [];
  for (const [slug, keys] of Object.entries(SERVICE_KEYS)) {
    if (keys.some((k) => q.includes(k))) hits.push(slug);
  }
  return hits.slice(0, 2);
}

const BASE_KNOWLEDGE = `
## Şirket
${BRAND_SENTENCE} Sekiz hizmet alanı; Türkiye genelinde uzaktan çalışır (keşif, tasarım onayı, teslim çevrim içi).

## Hizmetler (detay sayfası: /hizmetler/<slug>)
${services.map((s) => `- ${s.title} — /hizmetler/${s.slug}: ${s.summary}`).join("\n")}

## Paketler — /paketler (FİYAT YAZILMAZ; fiyat keşif görüşmesi sonrası yazılı teklifle)
Her hizmette üç kapsam: Başlangıç / Standart / Pro (SEO'da ek: Haritalar & İşletme Profili).

## Süreç — /surec
${PROCESS_STEPS.map((p) => `${p.no} ${p.name}: çıktı ${p.output}`).join(" · ")}

## Yaptığımız işler — /isler
${cases.map((c) => `- ${c.client} (${c.location}) — /isler/${c.slug}`).join("\n")}

## İletişim
Telefon 0544 218 8645 · E-posta karneryazilim@gmail.com · Teklif formu: /iletisim
`;

/** Soruya göre ayrıntı blokları. */
function buildContext(lastUser: string, history: string): string {
  const q = norm(lastUser + " " + history.slice(-400));
  const parts: string[] = [];

  const svcSlugs = pickServices(q);
  for (const slug of svcSlugs) {
    const s = services.find((x) => x.slug === slug);
    if (!s) continue;
    parts.push(
      `### ${s.title} — /hizmetler/${s.slug}
${s.intro}
Kapsam: ${s.features.map((f) => f.title).join("; ")}.${s.proof ? `\nSaha notu: ${s.proof}` : ""}${
        s.faq?.length ? `\nSSS: ${s.faq.slice(0, 4).map((f) => `S: ${f.q} C: ${f.a}`).join(" | ")}` : ""
      }`,
    );
    const cat = PACKAGE_CATEGORIES.find((c) => c.serviceSlug === slug);
    if (cat) {
      parts.push(
        `### ${cat.name} paketleri — /paketler#${cat.slug}
${cat.tiers
  .map(
    (t) =>
      `- ${t.name}: ${t.tagline} Kim için: ${t.audience} Dâhil: ${t.includes.slice(0, 4).join("; ")}.`,
  )
  .join("\n")}`,
      );
    }
  }

  const asksPrice = /fiyat|ucret|kac para|maliyet|butce|paket|ne kadar/.test(q);
  if (asksPrice && svcSlugs.length === 0) {
    parts.push(
      `### Paket özeti — /paketler
${PACKAGE_CATEGORIES.map((c) => `- ${c.name}: ${c.tiers.map((t) => t.name).join(" / ")} — ${c.intro.split(".")[0]}.`).join("\n")}`,
    );
  }
  if (asksPrice) {
    parts.push(`Paket SSS: ${PACKAGE_FAQ.slice(0, 4).map((f) => `S: ${f.q} C: ${f.a}`).join(" | ")}`);
  }

  if (/sure|kac gun|ne zaman|teslim|hafta|ay icinde|nasil baslar|surec|adim/.test(q)) {
    parts.push(`### Süreç ayrıntısı — /surec\n${PROCESS_STEPS.map((p) => `${p.no} ${p.name}: ${p.text}`).join("\n")}`);
  }

  if (/is|referans|ornek|musteri|portfoy|yaptiginiz|vaka|proje/.test(q)) {
    parts.push(`### İşler ayrıntısı\n${cases.map((c) => `- ${c.client} (${c.location}) — /isler/${c.slug}: ${c.summary}`).join("\n")}`);
  }

  // Genel SSS: soruyla kelime örtüşmesi olanlar
  const faqHits = HOME_FAQ.filter((f) => {
    const words = norm(f.q).split(/\W+/).filter((w) => w.length > 4);
    return words.some((w) => q.includes(w));
  }).slice(0, 3);
  if (faqHits.length) parts.push(`### Genel SSS\n${faqHits.map((f) => `S: ${f.q} C: ${f.a}`).join("\n")}`);

  // Rehberler: başlık örtüşmesi
  const guideHits = guides
    .filter((g) => {
      const words = norm(g.title).split(/\W+/).filter((w) => w.length > 4);
      return words.some((w) => q.includes(w));
    })
    .slice(0, 4);
  if (guideHits.length) parts.push(`### İlgili rehberler\n${guideHits.map((g) => `- /rehber/${g.slug}: ${g.title}`).join("\n")}`);

  return parts.join("\n\n");
}

const STYLE_RULES = `Sen KARNER'in web sitesindeki asistansın. Görevin: ziyaretçinin sorusuna bilgi tabanındaki GERÇEK bilgiyle kısa ve net cevap vermek; uygun olduğunda doğru sayfaya veya iletişime yönlendirmek.

# Cevap biçimi
- Sade düz metin. Markdown YOK (yıldız, kare, başlık işareti, köşeli parantez yok). Madde gerekiyorsa satır başına "•".
- Sayfa önerirken yolu düz yaz: "Detaylar: /paketler" gibi. Başka link biçimi yok.
- 2-5 kısa cümle, en fazla ~80 kelime. Önce soruya doğrudan cevap, sonra gerekiyorsa tek bir somut sonraki adım.
- "Siz" dili; sıcak, profesyonel. "Merhaba" ile başlama (ilk selam verildi). Pazarlama klişesi, abartı, ünlem bolluğu yok.
- Soru belirsizse sonunda TEK kısa netleştirici soru sor (sektör, mevcut site var mı, hedef).
- Sadece selam/boş mesaj gelirse: tek sıcak cümleyle karşıla ve ne konuda yardımcı olabileceğini 3 örnekle sor (web sitesi, arama/yapay zekâ görünürlüğü, otomasyon, video, sosyal medya).

# İçerik kuralları
- Bilgi tabanında olmayanı söyleme: fiyat, süre/teslim tarihi, müşteri sayısı, yıl deneyimi, sertifika, sıralama garantisi, ekip isimleri, şehir/ofis adresi. Sorulursa dürüstçe "bu bilgiyi burada veremiyorum" de, /iletisim veya telefonu ver.
- Fiyat: kapsama göre keşif görüşmesinden sonra yazılı teklifle verilir; ilgili paket kapsamını 1 cümleyle özetle; /paketler ve /iletisim; ihtiyacı netleştiren tek soru.
- Süre: kesin gün yok; 4 adımlı süreç ve kapsama bağlılık; /surec.
- Sıralama/garanti: garanti verilmez; hedef birlikte belirlenir, tarihli raporla ölçülür.
- Konu dışı (ödev, kod, genel sohbet): kibarca KARNER hizmetlerine dön.
- Bilmiyorsan bilmediğini söyle; uydurma.

# Örnek
Soru: Web sitesi fiyatlarınız ne kadar?
Cevap: Fiyat, kapsama göre kısa bir keşif görüşmesinden sonra yazılı teklifle veriliyor. Web sitesinde üç kapsam var: Başlangıç (tek sayfa, kendi domaininiz, Google Business Profile), Standart (5-8 sayfa + sıralanma altyapısı) ve Pro (yapay zekâ görünürlüğü + otomasyon). Kapsamlar: /paketler — teklif için: /iletisim. İşletmeniz hangi sektörde, mevcut bir siteniz var mı?`;

function systemPrompt(lastUser: string, history: string) {
  const ctx = buildContext(lastUser, history);
  return `${STYLE_RULES}\n\n# Bilgi tabanı\n${BASE_KNOWLEDGE}${ctx ? `\n\n# Soruyla ilgili ayrıntılar\n${ctx}` : ""}`;
}

/** Groq ücretsiz katmanda model başına ayrı TPM kovası var — 429/413'te sıradakine geç. */
const MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"]; // 2026-08-21 /v1/models listesinden

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
  let meta: { sessionId: string; page: string; turn: number } = { sessionId: "", page: "", turn: 0 };
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
    meta = {
      sessionId: typeof body.sessionId === "string" ? body.sessionId.slice(0, 40) : "",
      page: typeof body.page === "string" ? body.page.slice(0, 300) : "",
      turn: Number.isFinite(Number(body.turn)) ? Number(body.turn) : 0,
    };
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

  const lastUserMsg = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
  const historyText = trimmed.slice(0, -1).map((m) => m.content).join(" ");
  const system = systemPrompt(lastUserMsg, historyText);

  let data: { choices?: { message?: { content?: string } }[] } | null = null;
  const callModel = (model: string) => {
    const isOss = model.startsWith("openai/");
    return fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, ...trimmed],
        // gpt-oss akıl yürütme tokenlarını da bu bütçeden harcar — payı geniş tut
        max_tokens: isOss ? 700 : 400,
        ...(isOss ? { reasoning_effort: "low" } : {}),
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    }).catch(() => null);
  };
  for (const model of MODELS) {
    let res = await callModel(model);
    // Dakikalık kota dolduysa ve kısa sürede açılacaksa aynı modeli bir kez daha dene
    if (res && res.status === 429) {
      const txt = await res.text();
      const m = txt.match(/try again in ([\d.]+)s/);
      const wait = m ? Math.min(3500, Math.ceil(parseFloat(m[1]) * 1000) + 150) : 0;
      if (wait > 0) {
        await new Promise((r) => setTimeout(r, wait));
        res = await callModel(model);
      } else {
        console.error("[chat] Groq", model, 429, txt.slice(0, 200));
      }
    }
    if (res?.ok) {
      data = await res.json();
      break;
    }
    // Kota/uzunluk/geçici hata: sıradaki modele geç (her modelin TPM kovası ayrı).
    if (res) console.error("[chat] Groq", model, res.status, (await res.text().catch(() => "")).slice(0, 200));
  }
  if (!data) {
    return NextResponse.json(
      { error: "Asistan şu anda yanıt veremiyor." },
      { status: 502 },
    );
  }

  const raw: string =
    data.choices?.[0]?.message?.content?.trim() ??
    "Üzgünüm, şu anda yanıt veremiyorum.";
  // Model bazen yine de markdown döker; arayüz düz metin gösterdiği için temizle.
  const reply = raw
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1: $2")
    .replace(/\[(\/[^\]\s]*)\]/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Ziyaretçi mesajı + asistan cevabı ekibe düşsün (KARNER n8n → Telegram + tablo).
  // Yanıt gönderildikten SONRA çalışır; webhook yoksa/hata verirse sohbeti etkilemez.
  const hook = process.env.CHAT_WEBHOOK_URL;
  const lastUser = lastUserMsg;
  if (hook && lastUser) {
    after(async () => {
      try {
        await fetch(hook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: meta.sessionId,
            page: meta.page,
            turn: meta.turn,
            message: lastUser,
            reply,
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch {
        /* bildirim başarısız olsa da sohbet devam eder */
      }
    });
  }

  return NextResponse.json({ reply });
}

import { NextRequest, NextResponse } from "next/server";
import { mailConfigured, sendLeadEmail } from "@/lib/mail";

export const runtime = "nodejs";

/**
 * Teklif formu → İKİ BAĞIMSIZ KANAL:
 *   1. n8n webhook (TEKLIF_WEBHOOK_URL) → Telegram bildirimi + tablo kaydı
 *   2. Doğrudan e-posta (bkz. lib/mail.ts) → karneryazilim@gmail.com
 *
 * İkinci kanal sonradan eklendi: n8n iş akışında e-posta adımı hiç yoktu, bu
 * yüzden talepler Telegram'a düşüyor ama posta kutusuna hiç ulaşmıyordu.
 *
 * Kanallar birbirine bağlı DEĞİL ve paralel çalışır. BİRİ bile başarılı olursa
 * talep bize ulaşmış demektir ve ziyaretçiye başarı dönülür — n8n durduğu için
 * müşteri kaybetmek ya da e-posta sağlayıcısı takıldı diye ziyaretçiye hata
 * göstermek istemiyoruz. İkisi birden başarısız olursa gerçek bir hata vardır
 * ve ziyaretçi telefon/e-postaya yönlendirilir.
 *
 * Webhook adresi ve API anahtarı sunucuda kalır; tarayıcıya sızmaz.
 * Honeypot alanı (website) doluysa bot sayılır, sessizce "ok" döner.
 */
type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  paket?: string;
  page?: string;
  website?: string; // honeypot
  kvkk?: boolean;
};

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  if (body.website) {
    // bot — hata vermeden kabul etmiş gibi dön
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const paket = clean(body.paket, 80);
  const page = clean(body.page, 300);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Ad, e-posta ve mesaj zorunludur." },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "E-posta adresi geçersiz." }, { status: 400 });
  }
  if (body.kvkk !== true) {
    return NextResponse.json(
      { ok: false, error: "Gizlilik metnini onaylamanız gerekiyor." },
      { status: 400 },
    );
  }

  const lead = { name, email, phone, message, paket, page };

  const webhookUrl = process.env.TEKLIF_WEBHOOK_URL;
  const channels: Promise<boolean>[] = [];

  if (webhookUrl) channels.push(postToWebhook(webhookUrl, lead));
  if (mailConfigured()) channels.push(sendLeadEmail(lead));

  if (channels.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Form şu anda yapılandırılmamış; lütfen e-posta ile yazın." },
      { status: 503 },
    );
  }

  // Paralel: biri yavaşsa diğerini bekletmesin. allSettled — bir kanalın
  // patlaması diğerinin sonucunu düşürmemeli.
  const results = await Promise.allSettled(channels);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);

  if (!delivered) {
    console.error("[KARNER] teklif hiçbir kanaldan iletilemedi:", results);
    return NextResponse.json(
      { ok: false, error: "Mesaj iletilemedi; lütfen e-posta veya telefonla ulaşın." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

/** n8n kanalı. Hata fırlatmaz; iki durumlu sonuç döner (bkz. rota başlığı). */
async function postToWebhook(url: string, lead: Record<string, string>) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[KARNER] n8n webhook yanıtı:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[KARNER] n8n webhook hatası:", err);
    return false;
  }
}

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Teklif formu → n8n webhook (KARNER instance) → Telegram bildirimi + tablo kaydı.
 * Webhook adresi sunucuda gizli (TEKLIF_WEBHOOK_URL); tarayıcıya sızmaz.
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

  const url = process.env.TEKLIF_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Form şu anda yapılandırılmamış; lütfen e-posta ile yazın." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message, paket, page }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Mesaj iletilemedi; lütfen e-posta veya telefonla ulaşın." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

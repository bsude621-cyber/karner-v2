import type { Lead } from "@/lib/mail";
import { SITE_URL } from "@/lib/site";

/**
 * Teklif talebi ve asistan sohbetini doğrudan Telegram'a gönderir.
 *
 * NEDEN VAR
 * Telegram bildirimi şimdiye kadar yalnızca n8n üzerinden geliyordu: site
 * webhook'a POST atıyor, n8n de Telegram'a düşürüyordu. Ekim 2026'da n8n
 * tarafı sessizce durdu; form ve asistan aynı anda sustu, e-posta ise (n8n'e
 * bağlı olmadığı için) gelmeye devam etti. Sitenin kodu değişmemişti — tek
 * ortak bağımlılık n8n'di. Bu dosya Telegram adımını, e-postada olduğu gibi,
 * sitenin içine alıyor: n8n çökse de bildirim gelir.
 *
 * n8n'İN YENİ GÖREVİ
 * Bu kanal açıkken n8n iş akışlarındaki Telegram düğümü KAPATILMALI, yoksa
 * her mesaj iki kez gelir. n8n tablo kaydı için çalışmaya devam eder.
 *
 * NEDEN KÜTÜPHANESİZ
 * Bot API düz bir POST; mail.ts ile aynı gerekçe — yeni bağımlılık yok.
 *
 * YAPILANDIRMA (Vercel → Settings → Environment Variables)
 *   TELEGRAM_BOT_TOKEN  zorunlu. BotFather'dan alınan token (n8n'deki Telegram
 *                       kimlik bilgisinde kayıtlı olan aynı token).
 *   TELEGRAM_CHAT_ID    zorunlu. Bildirimin düşeceği kişi/grup kimliği. Birden
 *                       fazla kişiye gitsin diye virgülle ayrılabilir:
 *                       "8783386179,123456789". Her kişi botta bir kez BAŞLAT'a
 *                       basmış olmalı; yoksa bot ona yazamaz (400 chat not found).
 *   İkisinden biri yoksa bu modül sessizce devre dışı kalır; site eskisi gibi
 *   çalışır.
 *   TELEGRAM_API_BASE   isteğe bağlı, yalnızca test: uç noktayı sahte bir
 *                       sunucuya yönlendirmek için. Üretimde ayarlanmaz.
 */

const API_BASE = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";

/**
 * Telegram tek mesaj sınırı 4096 karakter (etiketler ve &amp; gibi kaçışlar
 * ayrıştırıldıktan sonra sayılır). Ham metin bu sınıra göre kırpılır, pay bırakıldı.
 */
const MAX_TEXT = 3900;

/** parse_mode=HTML: ziyaretçi metni etiket olarak yorumlanmasın. */
function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const cut = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max)}…` : value;

function line(label: string, value: string) {
  return value ? `<b>${label}:</b> ${escapeHtml(value)}\n` : "";
}

/** Önizleme dağıtımından gelen bildirim canlıdan ayırt edilsin diye alan adı başlıkta. */
const HOST = new URL(SITE_URL).host;

/** Vercel sunucusu UTC'de çalışır; saat Türkiye saatiyle yazılmalı. */
const stamp = () => new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

/**
 * Bot özel sohbette yalnızca chat_id'ye yazar; "bota eklenmek" bildirim almak
 * için yetmez. Ekipte herkes ayrı kişi olarak listelenir — grup yerine bu,
 * çünkü grup ayarı değişince grubun kimliği değişip bildirim sessizce kesilebilir.
 */
const chatIds = () =>
  (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

export const telegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && chatIds().length > 0);

/**
 * Mesajı listedeki herkese paralel gönderir.
 *
 * @returns en az bir kişiye ulaştıysa true; yapılandırılmamışsa veya hiçbirine
 *          ulaşmadıysa false. ASLA hata fırlatmaz — mail.ts ile aynı iki
 *          durumlu sözleşme.
 */
async function send(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const ids = chatIds();
  if (!token || ids.length === 0) return false;

  const results = await Promise.all(ids.map((chatId) => sendTo(token, chatId, text)));
  return results.some(Boolean);
}

async function sendTo(token: string, chatId: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Vercel günlüklerinde sebebi yazar: 401 token yanlış, 400 "chat not
      // found" chat id yanlış ya da bot gruba ekli değil.
      console.error(
        "[KARNER] Telegram gönderilemedi:",
        chatId,
        res.status,
        await res.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[KARNER] Telegram gönderilemedi:", chatId, err);
    return false;
  }
}

export function sendLeadTelegram(lead: Lead) {
  const head =
    `📩 <b>Yeni teklif talebi</b> — ${HOST}\n` +
    `🕒 ${stamp()}\n\n` +
    line("Ad", lead.name) +
    line("E-posta", lead.email) +
    line("Telefon", lead.phone) +
    line("Paket", lead.paket) +
    line("Sayfa", lead.page);
  const room = MAX_TEXT - head.length - 20;
  return send(`${head}\n<b>Mesaj:</b>\n${escapeHtml(cut(lead.message, room))}`);
}

export function sendChatTelegram(chat: {
  sessionId: string;
  page: string;
  turn: number;
  message: string;
  reply: string;
}) {
  // n8n'in gönderdiği eski bildirimle aynı düzen — ekip alışık olduğu biçimi görsün.
  const head =
    `💬 Site sohbeti — ${HOST}\n` +
    `🧵 Oturum ${escapeHtml(chat.sessionId || "-")} · ${chat.turn ? `${chat.turn}. mesaj` : "yeni mesaj"}\n` +
    `📄 ${escapeHtml(chat.page || "-")}\n` +
    `🕒 ${stamp()}\n\n` +
    `👤 Ziyaretçi:\n${escapeHtml(chat.message)}\n\n🤖 Asistan:\n`;
  // Ziyaretçi mesajı rotada 500 karaktere kırpılıyor; taşan kısım her zaman cevaptır.
  const room = MAX_TEXT - head.length;
  return send(head + escapeHtml(cut(chat.reply, room)));
}

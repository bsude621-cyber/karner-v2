import { CONTACT, SITE_NAME } from "@/lib/site";

/**
 * Teklif taleplerini doğrudan e-postayla gönderir.
 *
 * NEDEN VAR
 * Form şimdiye kadar yalnızca n8n webhook'una gidiyordu; n8n de Telegram'a
 * düşürüyordu. E-posta adımı o iş akışında hiç yoktu, dolayısıyla
 * karneryazilim@gmail.com'a hiçbir şey ulaşmıyordu. Bu dosya o adımı n8n'e
 * bağımlı olmadan sitenin içine alıyor: iki kanal birbirinden bağımsız çalışır,
 * biri düşse diğeri talebi taşır.
 *
 * NEDEN RESEND VE NEDEN KÜTÜPHANESİZ
 * Resend'in REST arayüzü düz bir POST isteği; `fetch` ile çağırmak için paket
 * kurmaya gerek yok. Böylece ne yeni bağımlılık ne de kilit dosyası değişikliği
 * giriyor — güncellenmesi gereken bir yüzey daha açmıyoruz.
 *
 * YAPILANDIRMA (Vercel → Settings → Environment Variables)
 *   RESEND_API_KEY   zorunlu. Yoksa bu modül sessizce devre dışı kalır ve site
 *                    eskisi gibi yalnızca n8n'e gönderir — yani anahtar
 *                    eklenene kadar hiçbir şey bozulmaz.
 *   MAIL_TO          isteğe bağlı, varsayılan CONTACT.email
 *   MAIL_FROM        isteğe bağlı. Varsayılan `onboarding@resend.dev`: Resend'in
 *                    alan adı doğrulaması yapılmadan da çalışan gönderen
 *                    adresi. Kendi alan adınızdan göndermek isterseniz
 *                    (bilgi@karneryazilim.com gibi) Resend'de alan adını
 *                    doğrulayıp bu değişkeni ayarlamanız yeterli.
 *   RESEND_ENDPOINT  isteğe bağlı. Yalnızca testte kullanılır: uç noktayı sahte
 *                    bir sunucuya yönlendirip gerçek e-posta göndermeden tüm
 *                    akışı (başlıklar, kaçış, hata halleri) doğrulamak için.
 *                    Üretimde ayarlanmaz.
 */

const RESEND_ENDPOINT = process.env.RESEND_ENDPOINT || "https://api.resend.com/emails";

export type Lead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  paket: string;
  page: string;
};

/** E-posta gövdesi HTML; ziyaretçiden gelen metin olduğu gibi gömülemez. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:6px 0;color:#111827;font-size:14px">${escapeHtml(value)}</td>
  </tr>`;
}

/** İnsan tarafından okunacak sade bir bildirim. Süs yok, bilgi var. */
function buildHtml(lead: Lead) {
  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#7b3fe4">${SITE_NAME}</p>
  <h1 style="margin:0 0 18px;font-size:19px;color:#111827">Siteden yeni teklif talebi</h1>
  <table style="border-collapse:collapse;width:100%">
    ${row("Ad Soyad", lead.name)}
    ${row("E-posta", lead.email)}
    ${row("Telefon", lead.phone)}
    ${row("Paket", lead.paket)}
    ${row("Geldiği sayfa", lead.page)}
  </table>
  <p style="margin:18px 0 6px;color:#6b7280;font-size:13px">Mesaj</p>
  <div style="white-space:pre-wrap;padding:14px 16px;background:#f6f5fb;border-left:3px solid #7b3fe4;border-radius:6px;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(
    lead.message,
  )}</div>
  <p style="margin:20px 0 0;color:#9ca3af;font-size:12px">
    Bu iletiye doğrudan yanıt verirseniz cevabınız ${escapeHtml(lead.email)} adresine gider.
  </p>
</div>`;
}

/**
 * Talebi e-postayla iletir.
 *
 * @returns gönderildiyse true; anahtar tanımlı değilse veya gönderim
 *          başarısızsa false. ASLA hata fırlatmaz — çağıran taraf için bu
 *          kanal iki durumludur, çünkü diğer kanal (n8n) hâlâ çalışıyor
 *          olabilir ve ziyaretçiye gereksiz yere hata göstermek istemiyoruz.
 */
export async function sendLeadEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.MAIL_TO || CONTACT.email;
  const from = process.env.MAIL_FROM || `${SITE_NAME} <onboarding@resend.dev>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Yanıtla'ya basınca doğrudan ziyaretçiye gitsin — adresi kopyalamaya gerek kalmasın.
        reply_to: lead.email,
        subject: `Yeni teklif talebi — ${lead.name}${lead.paket ? ` (${lead.paket})` : ""}`,
        html: buildHtml(lead),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Vercel çalışma zamanı günlüklerinde görünsün: anahtar yanlış mı, alan
      // adı doğrulanmamış mı, sebebi burada yazar.
      console.error(
        "[KARNER] e-posta gönderilemedi:",
        res.status,
        await res.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[KARNER] e-posta gönderilemedi:", err);
    return false;
  }
}

/** Anahtar tanımlı mı — rota "hiçbir kanal yapılandırılmamış" durumunu ayırt etsin diye. */
export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

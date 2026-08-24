"use client";

import { CONTACT } from "@/lib/site";

/**
 * Son savunma hattı: kök layout'un KENDİSİ patlarsa devreye girer ve onun
 * yerine geçer. Bu yüzden kendi <html>/<body> etiketlerini taşımak zorunda.
 *
 * Bilinçli olarak hiçbir şeye bağımlı değil: Tailwind sınıfı yok, font yok,
 * globals.css yok, ikon paketi yok — çünkü buraya düşülmesinin muhtemel
 * sebeplerinden biri tam da o varlıklardan birinin yüklenememesi olabilir.
 * Yalnızca satır içi stiller; her koşulda boyanır.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#05060a",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Bir aksilik oldu | KARNER</title>
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#a371ff",
            }}
          >
            KARNER
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "28px",
              lineHeight: 1.25,
              fontWeight: 700,
            }}
          >
            Site şu an açılamadı
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Geçici bir sorun yaşıyoruz. Yeniden denemek çoğu zaman yeterli
            oluyor; olmazsa doğrudan bize ulaşabilirsiniz.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "9999px",
                padding: "12px 26px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#ffffff",
                background: "#7b3fe4",
              }}
            >
              Yeniden Dene
            </button>
            {/* Bilinçli olarak <Link> DEĞİL: bu ekran kök layout'un yerine
                geçtiğinde React uygulamasının kendisi zaten sorunlu demektir.
                İstemci tarafı yönlendirme aynı bozuk duruma geri düşerdi;
                düz bir <a> tam sayfa yenilemesi yapar ve uygulamayı sıfırdan
                kurar. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: "9999px",
                padding: "12px 26px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              Ana Sayfa
            </a>
          </div>

          <p
            style={{
              marginTop: "28px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <a
              href={`tel:${CONTACT.phoneE164}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {CONTACT.phoneDisplay}
            </a>
            <span style={{ margin: "0 8px" }}>·</span>
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {CONTACT.email}
            </a>
          </p>

          {error?.digest ? (
            <p
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              Hata kodu: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}

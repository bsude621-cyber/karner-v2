"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Sayfa düzeyinde hata ekranı.
 *
 * Bu dosya yokken Next.js üretimde kendi çıplak ekranını gösteriyordu
 * ("Application error: a client-side exception has occurred" — tarayıcı
 * Türkçeye çevirince "web sitesinde bir hata oluştu"). Artık hem markanın
 * diliyle konuşan bir ekran var hem de gerçek bir çıkış yolu: `unstable_retry`
 * bölümü yeniden render eder, başaramazsa telefon/e-posta elimizin altında.
 *
 * Not: Bu ekrana düşülmesi artık çok daha zor — süs katmanları SafeBoundary ile
 * ayrı ayrı korunuyor (bkz. SafeBoundary.tsx). Burası yalnızca asıl içerikte
 * beklenmedik bir şey olursa devreye girer.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Vercel'in çalışma zamanı günlüklerinde digest ile eşleşsin diye.
    console.error("[KARNER] sayfa hatası:", error?.digest ?? "", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.15),transparent_65%)] blur-2xl" />
      <div className="relative">
        <Image
          src="/logo-emblem.png"
          alt="KARNER"
          width={64}
          height={64}
          className="mx-auto h-16 w-16 object-contain"
        />
        <p className="mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
          Bir aksilik
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Bu sayfa şu an açılamadı
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/60">
          Geçici bir sorun olabilir. Yeniden denemek çoğu zaman yeterli oluyor;
          olmazsa doğrudan bize ulaşın — hemen yardımcı oluruz.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Yeniden Dene
          </button>
          <Link href="/" className="btn btn-secondary inline-flex items-center gap-2">
            Ana Sayfa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-8 text-sm text-white/45">
          <a href={`tel:${CONTACT.phoneE164}`} className="hover:text-white">
            {CONTACT.phoneDisplay}
          </a>
          <span className="mx-2">·</span>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
            {CONTACT.email}
          </a>
        </p>
      </div>
    </main>
  );
}

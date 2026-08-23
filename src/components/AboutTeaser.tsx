"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/hover-footer";

/** Ana sayfadaki kısa Hakkımızda kutusu — detay /hakkimizda sayfasında.
 *  Yıldız alanı artık bölüme özel değil: site geneli SiteBackground katmanı
 *  bu bölümün de arkasından geçiyor (tek WebGL bağlamı). */
export default function AboutTeaser() {
  return (
    <section id="hakkimizda" className="relative">
      {/* Mobilde bölüm daha uzun ve içerik üstte: yıldız alanı kartın altında görünür kalsın */}
      <div className="min-h-[92vh] w-full sm:min-h-[60vh]">
        <div className="relative z-10 flex min-h-[92vh] flex-col items-center justify-start px-4 pb-24 pt-10 sm:min-h-[60vh] sm:justify-center sm:py-24 sm:px-6">
          {/* Yıldızların üstünde büyük KARNER yazısı (eski tam bölümden geri alındı — Sude 2026-08-21) */}
          <div className="reveal relative z-30 mb-8 flex h-28 w-full max-w-3xl items-center justify-center sm:h-36">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.28),transparent_65%)] blur-[36px]"
            />
            <TextHoverEffect text="KARNER" className="relative z-10 h-full w-full" />
          </div>

          <div className="relative w-full max-w-5xl">
            <div className="reveal mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-white/5 p-[1px] shadow-[0_16px_50px_-16px_rgba(0,0,0,0.85)]">
              <div className="relative rounded-[15px] bg-gradient-to-b from-(--card-top) to-(--card-bottom) px-6 py-10 text-center backdrop-blur-xl sm:px-10">
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-accent-light">
                  Hakkımızda
                </p>
                <p className="mx-auto max-w-md text-base text-white/85 sm:text-lg">
                  KARNER — yazılım ve medyayı aynı dalgada birleştiren dijital
                  stüdyo
                </p>
                <p className="mx-auto mb-8 mt-3 max-w-md text-sm leading-relaxed text-white/55">
                  Türkiye genelinde hizmet veren
                  yazılım ve medya ajansı: web, mobil, yapay zekâ destekli medya,
                  SEO/GEO/AEO ve otomasyon.
                </p>
                <Link href="/hakkimizda" className="btn btn-secondary group">
                  Bizi Tanıyın
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

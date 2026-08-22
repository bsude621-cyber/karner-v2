"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import DeferredMount from "@/components/DeferredMount";

// Gündüz: robotun teknik çizimi (tel kafes). Yalnızca tarayıcıda, görünür olunca.
const AboutWireframe = dynamic(() => import("@/components/three/AboutWireframe"), {
  ssr: false,
});

/** Ana sayfadaki kısa Hakkımızda kutusu — detay /hakkimizda sayfasında.
 *  Koyu mod: yıldız alanı (DottedSurface) + ortada kart (eskisi gibi).
 *  Gündüz (v7.4 "Mühendis Kâğıdı"): kâğıt zemin + mürekkep noktaları, solda beyaz
 *  pafta kartı, sağda robotun dönen TEKNİK ÇİZİMİ ve ölçü/etiket işaretleri. */
export default function AboutTeaser() {
  return (
    <section id="hakkimizda" className="about-root relative">
      {/* Mobilde bölüm daha uzun ve içerik üstte: yıldız alanı kartın altında görünür kalsın */}
      <DottedSurface className="min-h-[92vh] w-full sm:min-h-[60vh]">
        <div className="relative z-10 flex min-h-[92vh] flex-col items-center justify-start px-4 pb-24 pt-10 sm:min-h-[60vh] sm:justify-center sm:py-24 sm:px-6">
          {/* Yıldızların üstünde büyük KARNER yazısı (eski tam bölümden geri alındı — Sude 2026-08-21) */}
          <div className="reveal relative z-30 mb-8 flex h-28 w-full max-w-3xl items-center justify-center sm:h-36">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.28),transparent_65%)] blur-[36px]"
            />
            <TextHoverEffect text="KARNER" className="relative z-10 h-full w-full" />
          </div>

          {/* Gündüzde iki sütun (kart + teknik çizim), koyuda tek sütun kart */}
          <div className="about-grid relative w-full max-w-5xl">
            <div className="about-sheet reveal mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-white/5 p-[1px] shadow-[0_16px_50px_-16px_rgba(0,0,0,0.85)]">
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
                {/* Teknik künye — yalnızca gündüz (about-spec), doğrulanabilir bilgiler */}
                <dl className="about-spec mx-auto mb-8 hidden max-w-md grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-left text-[11px] tracking-[0.04em]">
                  <dt className="font-mono uppercase tracking-[0.22em] text-(--accent)">Hizmet</dt>
                  <dd className="text-(--ink)">8 alan — web, mobil, AI video, AI görsel, SEO/GEO/AEO, otomasyon, marka, sosyal içerik</dd>
                  <dt className="font-mono uppercase tracking-[0.22em] text-(--accent)">Bölge</dt>
                  <dd className="text-(--ink)">Türkiye geneli · uzaktan çalışma</dd>
                  <dt className="font-mono uppercase tracking-[0.22em] text-(--accent)">Yaklaşım</dt>
                  <dd className="text-(--ink)">Tek ekip, uçtan uca — tasarım, yazılım, içerik ve görünürlük birlikte</dd>
                </dl>
                <Link href="/hakkimizda" className="btn btn-secondary group">
                  Bizi Tanıyın
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Teknik çizim paneli — yalnızca gündüz (CSS gizler, bileşen koyuda canvas kurmaz) */}
            <div className="about-draw relative hidden h-[22rem] w-full sm:h-[26rem]">
              <DeferredMount>
                <AboutWireframe className="absolute inset-0" />
              </DeferredMount>
              {/* Teknik çizim açıklamaları: numaralı oklar (kaydırmayla çizilir) + ölçüler. Dekoratif, iddia yok. */}
              <svg
                aria-hidden
                className="about-dims pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                fill="none"
              >
                <g stroke="rgba(26,20,48,0.5)" strokeWidth="1">
                  {/* 01 Kafa → sol üst etiket */}
                  <line x1="50%" y1="17%" x2="38%" y2="17%" pathLength={1} className="about-dim-line about-l1" />
                  <line x1="38%" y1="17%" x2="30%" y2="11%" pathLength={1} className="about-dim-line about-l1" />
                  {/* 02 Gövde → sağ orta etiket */}
                  <line x1="50%" y1="46%" x2="62%" y2="46%" pathLength={1} className="about-dim-line about-l2" />
                  <line x1="62%" y1="46%" x2="70%" y2="52%" pathLength={1} className="about-dim-line about-l2" />
                  {/* 03 Duruş → sol alt etiket */}
                  <line x1="50%" y1="80%" x2="40%" y2="80%" pathLength={1} className="about-dim-line about-l3" />
                  <line x1="40%" y1="80%" x2="30%" y2="86%" pathLength={1} className="about-dim-line about-l3" />
                  {/* dikey ölçü (sağda) */}
                  <line x1="93%" y1="12%" x2="93%" y2="88%" pathLength={1} className="about-dim-line about-l4" />
                  <line x1="91%" y1="12%" x2="95%" y2="12%" pathLength={1} className="about-dim-line about-l4" />
                  <line x1="91%" y1="88%" x2="95%" y2="88%" pathLength={1} className="about-dim-line about-l4" />
                  {/* yatay ölçü (altta) */}
                  <line x1="36%" y1="99%" x2="64%" y2="99%" pathLength={1} className="about-dim-line about-l4" />
                  <line x1="36%" y1="97%" x2="36%" y2="101%" pathLength={1} className="about-dim-line about-l4" />
                  <line x1="64%" y1="97%" x2="64%" y2="101%" pathLength={1} className="about-dim-line about-l4" />
                </g>
                {/* ok uçları (nokta) */}
                <g fill="rgba(26,20,48,0.75)">
                  <circle cx="50%" cy="17%" r="2.5" className="about-dot about-l1" />
                  <circle cx="50%" cy="46%" r="2.5" className="about-dot about-l2" />
                  <circle cx="50%" cy="80%" r="2.5" className="about-dot about-l3" />
                </g>
              </svg>
              {/* Etiketler (HTML — Türkçe karakter ve satır kırma için) */}
              <div className="about-call about-l1 absolute left-[2%] top-[3%] max-w-[11rem] text-left">
                <span className="about-num">01</span>
                <span className="about-title">Kafa — Strateji</span>
                <span className="about-sub">Yapay zekâ, arama görünürlüğü, plan</span>
              </div>
              <div className="about-call about-l2 absolute right-[2%] top-[50%] max-w-[11rem] text-left">
                <span className="about-num">02</span>
                <span className="about-title">Gövde — Yazılım</span>
                <span className="about-sub">Web, mobil, otomasyon, entegrasyon</span>
              </div>
              <div className="about-call about-l3 absolute left-[0%] top-[86%] max-w-[12rem] text-left">
                <span className="about-num">03</span>
                <span className="about-title">Duruş — Medya</span>
                <span className="about-sub">Video, görsel, marka, sosyal içerik</span>
              </div>
              <span className="about-tag absolute right-[3%] top-[3%] rounded-sm border border-(--ink)/40 bg-(--background)/80 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-(--ink)">
                Teknik çizim · KARNER robotu
              </span>
            </div>
          </div>
        </div>
      </DottedSurface>
    </section>
  );
}

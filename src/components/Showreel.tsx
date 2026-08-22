"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

/**
 * "Sahadan kareler" — gerçek işlerden kısa kesitlerin kesintisiz akan kontak
 * baskısı (film şeridi). Klipler sessiz, döngülü; yalnızca görünürken yüklenir
 * ve oynar (IntersectionObserver), üzerine gelince şerit durur.
 * Kaynaklar: /public/isler (gerçek iş videoları). İddia yok — etiketler iş adı.
 */
type Clip = { src: string; poster: string; label: string; sub: string; href: string; portrait: boolean };

const CLIPS: Clip[] = [
  { src: "/isler/bns-reklam/uyku.mp4", poster: "/isler/bns-reklam/uyku-poster.jpg", label: "BNS Enerji", sub: "Reklam filmi · Sıcak uyutmuyor", href: "/isler/bns-enerji-klima-reklam-filmleri", portrait: true },
  { src: "/isler/aysa-laptop.mp4", poster: "/isler/aysa-laptop-poster.jpg", label: "AYSA Endüstriyel Temizlik", sub: "Yapay zekâ araması · ekran kaydı", href: "/isler/aysa-endustriyel-temizlik", portrait: true },
  { src: "/isler/bns-reklam/buz.mp4", poster: "/isler/bns-reklam/buz-poster.jpg", label: "BNS Enerji", sub: "Reklam filmi · Klima sezonu başladı", href: "/isler/bns-enerji-klima-reklam-filmleri", portrait: true },
  { src: "/isler/dukkan-takip.mp4", poster: "/isler/dukkan-takip-poster.jpg", label: "Dükkân Takip", sub: "Telegram botu · kullanım kaydı", href: "/isler/dukkan-takip-telegram-botu", portrait: false },
  { src: "/isler/bns-reklam/amber.mp4", poster: "/isler/bns-reklam/amber-poster.jpg", label: "BNS Enerji", sub: "Reklam filmi · Bu sıcağa katlanmayın", href: "/isler/bns-enerji-klima-reklam-filmleri", portrait: true },
  { src: "/isler/bns-reklam/krem.mp4", poster: "/isler/bns-reklam/krem-poster.jpg", label: "BNS Enerji", sub: "Reklam filmi · Klima almanın tam zamanı", href: "/isler/bns-enerji-klima-reklam-filmleri", portrait: true },
];

function Frame({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = clip.src;
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [clip.src]);

  return (
    <Link
      href={clip.href}
      className={`showreel-frame group relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black ${
        clip.portrait ? "aspect-[9/16] h-[17rem] sm:h-[21rem]" : "aspect-video h-[17rem] sm:h-[21rem]"
      }`}
      aria-label={`${clip.label} — ${clip.sub}`}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
      />
      {/* kontak baskı kenar etiketi */}
      <span className="showreel-tag pointer-events-none absolute left-2 top-2 rounded-sm border border-paper/30 bg-black/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-paper backdrop-blur-sm">
        Kare {String(index + 1).padStart(2, "0")}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8 text-left">
        <span className="block text-xs font-semibold text-paper">{clip.label}</span>
        <span className="block text-[11px] text-paper/70">{clip.sub}</span>
      </span>
    </Link>
  );
}

export default function Showreel() {
  const list = [...CLIPS, ...CLIPS]; // kesintisiz döngü için iki kopya
  return (
    <section id="sahadan" className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Sahadan"
          title="Gerçek işlerden kareler"
          highlight="kareler"
          subtitle="Müşteri işlerinden kısa kesitler — ses kapalı, döngüde. Tamamı ve hikâyeleri İşlerimiz sayfasında."
        />
      </div>
      <div className="showreel-strip relative mt-12">
        {/* kenar erimeleri */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
        {/* şerit delikleri (film perforasyonu) */}
        <div className="showreel-perf pointer-events-none absolute inset-x-0 top-0 h-3" aria-hidden />
        <div className="showreel-perf pointer-events-none absolute inset-x-0 bottom-0 h-3" aria-hidden />
        <div className="showreel-track flex w-max gap-4 py-6 sm:gap-5">
          {list.map((c, i) => (
            <Frame key={`${c.src}-${i}`} clip={c} index={i % CLIPS.length} />
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl justify-center px-6">
        <Link href="/isler" className="btn btn-secondary group">
          Tüm işleri gör
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

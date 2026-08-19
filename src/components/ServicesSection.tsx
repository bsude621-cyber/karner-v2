"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SpaceBackground } from "@/components/ui/space-background";
import SectionHeading from "@/components/ui/section-heading";
import { services as serviceData } from "@/data/services";

// Kısa fayda/sonuç satırları (teknik etiketlerden daha ikna edici)
const benefits: Record<string, string> = {
  "web-sitesi-gelistirme": "Ziyaretçiyi müşteriye çeviren deneyim",
  "mobil-uygulama": "Tek kodla iki platform, daha az maliyet",
  "ai-video-reklam": "Günler yerine saatlerde içerik",
  "ai-urun-gorseli": "Çekim masrafı olmadan stüdyo kalitesi",
  "seo-geo-aeo": "Google + ChatGPT'de aynı anda görünür",
  "otomasyon-sistemleri": "Tekrarlayan işlere son, zaman kazanın",
  "marka-grafik-tasarim": "Her yüzeyde tutarlı marka",
};

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // framer-motion'ın useReducedMotion'ı yerine yerleşik media query —
  // kütüphaneyi ana pakete sokmamak için (dağıtım animasyonu artık WAAPI).
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const dealingRef = useRef(false);
  /** Kartlar gizlendi, dağıtılmayı bekliyor. */
  const armedRef = useRef(false);

  /**
   * Kartları gizle — YALNIZCA bölüm ekran dışındayken çağrılır, böylece
   * kullanıcı gizlenme anını görmez. Kartlar sunucudan görünür geldiği için
   * (JavaScript çalışmasa da okunsunlar diye) bu adım gerekli.
   */
  const arm = useCallback(() => {
    if (reduceMotion) return;
    cardRefs.current.forEach((el) => {
      if (el) el.style.opacity = "0";
    });
    armedRef.current = true;
  }, [reduceMotion]);

  // Kartları merkez-üstteki "desteden" sırayla dağıt (iskambil dağıtır gibi)
  const deal = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || dealingRef.current) return;
    dealingRef.current = true;
    armedRef.current = false;

    const gr = grid.getBoundingClientRect();
    const originX = gr.left + gr.width / 2; // deste: üst-orta
    const originY = gr.top - 24;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    let last = 0;

    cards.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const dx = originX - (r.left + r.width / 2);
      const dy = originY - (r.top + r.height / 2);
      const deckRot = (i % 2 === 0 ? -1 : 1) * (7 + ((i * 13) % 13));
      const delay = i * 0.09;
      last = delay;

      // Web Animations API — framer'ın animate'iyle birebir aynı hareket,
      // sıfır kütüphane maliyeti.
      const anim = el.animate(
        [
          {
            opacity: 0,
            transform: `translate(${dx}px, ${dy}px) rotate(${deckRot}deg) scale(0.6)`,
          },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 550,
          delay: delay * 1000,
          easing: "cubic-bezier(0.16, 0.84, 0.3, 1)",
          fill: "both",
        }
      );
      // fill:both aktif kaldıkça arm()'ın inline opacity=0'ı ezilir —
      // bitince stil inline'a yazılır, animasyon bırakılır.
      anim.onfinish = () => {
        try {
          anim.commitStyles();
        } catch {}
        anim.cancel();
      };
    });

    window.setTimeout(() => {
      dealingRef.current = false;
    }, (last + 0.6) * 1000);
  }, []);

  /**
   * Tek gözlemci iki işi birden yapıyor:
   *  - bölüm ekrandan ÇIKINCA kartları gizle (ekran dışında, kimse görmez)
   *  - bölüme GİRİNCE, gizliyse dağıt
   * Böylece dağıtım tam kullanıcı baktığı anda başlıyor ve bölüme her
   * dönüşte yeniden oynuyor — sayfayı yenilemeye gerek kalmıyor.
   *
   * reduced-motion açıkken hiç gizlenmiyor: kartlar hep görünür kalıyor.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (armedRef.current) deal();
        } else {
          arm();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, [reduceMotion, arm, deal]);

  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Galaxy / yıldız arka planı (marka moru) */}
      <SpaceBackground particleCount={520} className="z-0" />
      {/* merkez mor parıltı */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.16),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Ne Yapıyoruz"
          title="Hizmetlerimiz"
          subtitle="Karta gelince büyür, tıklayınca ilgili sayfaya geçersiniz — yazılım ve medyada uçtan uca dijital çözümler."
        />
      </div>

      {/* 2 satırlık ızgara: mobil 1, tablet 2-3, masaüstü 4 sütun (4 + 3) */}
      <div
        ref={gridRef}
        className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {serviceData.map((s, i) => (
          <div
            key={s.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="will-change-transform"
          >
            <Link
              href={`/hizmetler/${s.slug}`}
              aria-label={`${s.title} — detayları gör`}
              className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-18px_rgba(123,63,228,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Görsel — hover'da zoom (next/image ile optimize) */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={s.imageSrc}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {/* marka moru tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/70 to-accent-2/80 mix-blend-multiply" />
                {/* alta doğru karartma (kart gövdesine bağlanır) */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* sıra & etiket */}
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                  {s.no} — {s.tag}
                </span>
                {/* köşe oku */}
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>

              {/* Gövde */}
              <div className="relative -mt-6 flex flex-col p-5 text-left">
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                {benefits[s.slug] ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-light">
                    <Sparkles className="h-3.5 w-3.5" />
                    {benefits[s.slug]}
                  </p>
                ) : null}
                <p className="mt-1.5 line-clamp-2 text-sm text-white/60">
                  {s.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 transition-colors duration-300 group-hover:text-accent-light">
                  Detayları Gör
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

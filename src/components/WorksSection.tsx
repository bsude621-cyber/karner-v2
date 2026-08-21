"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Work = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  url: string;
  /** Hero videosu (public/demos altında). */
  video: string;
  /**
   * Gerçek poster görseli. Önceden video adresine `#t=8` gibi medya parçası
   * ekleyip tarayıcıdan o kareyi göstermesini istiyordum; masaüstünde çalıştı
   * ama iOS Safari kullanıcı dokunmadan videoyu yüklemediği için kartlar
   * siyah kutu olarak görünüyordu. Poster görseli her yerde çalışıyor.
   */
  poster: string;
  /** Oynatma bu saniyeden başlar — poster karesiyle aynı yer, geçiş pürüzsüz olsun. */
  posterTime: number;
  tags: string[];
};

const works: Work[] = [
  {
    id: "icmimar",
    title: "İç Mimarlık Stüdyosu",
    sector: "İç Mimarlık",
    summary:
      "Ziyaretçi daha okumadan işin kalitesini görüyor, teklif formu elinin altında.",
    url: "https://icmimar-demo.vercel.app",
    video: "/demos/icmimar.webm",
    poster: "/demos/icmimar-poster.jpg",
    posterTime: 8,
    tags: ["Video Hero", "Proje Galerisi", "Teklif Formu"],
  },
  {
    id: "mimar",
    title: "Mimarlık Stüdyosu",
    sector: "Mimarlık",
    summary:
      "Sade tasarım projeleri öne çıkarıyor, dikkat doğrudan işin kendisine gidiyor.",
    url: "https://mimar-demo.vercel.app",
    video: "/demos/mimar.webm",
    poster: "/demos/mimar-poster.jpg",
    posterTime: 8,
    tags: ["Sinematik", "Portfolyo"],
  },
  {
    id: "insaat",
    title: "İnşaat & Mühendislik",
    sector: "İnşaat",
    summary:
      "Büyük bütçeli işlerde aranan kurumsal güveni veren duruş, referanslar önde.",
    url: "https://insaat-web-eight.vercel.app",
    video: "/demos/insaat.webm",
    poster: "/demos/insaat-poster.jpg",
    posterTime: 4,
    tags: ["Kurumsal", "Referanslar", "Güven"],
  },
  {
    id: "dustas",
    title: "Duşakabin & Banyo",
    sector: "Banyo & Yapı",
    summary:
      "Ziyaretçi aradığı ürünü birkaç tıkta buluyor, iletişim her ekranda.",
    url: "https://dustas-demo.vercel.app",
    video: "/demos/dustas.webm",
    poster: "/demos/dustas-poster.jpg",
    posterTime: 8,
    tags: ["Ürün Vitrini", "Katalog"],
  },
  {
    id: "diyetisyen",
    title: "Diyetisyen Kliniği",
    sector: "Sağlık",
    summary:
      "Randevuya giden yolu kısaltıyor, danışan yorumları güveni pekiştiriyor.",
    url: "https://diyetisyen-demo.vercel.app",
    video: "/demos/diyetisyen.webm",
    poster: "/demos/diyetisyen-poster.jpg",
    posterTime: 8,
    tags: ["Randevu", "Paketler"],
  },
  {
    id: "meridyen",
    title: "Gayrimenkul Ofisi",
    sector: "Gayrimenkul",
    summary:
      "Kaydırdıkça açılan sinematik giriş — ilan sitelerinden ayrışan ilk izlenim.",
    url: "https://meridyen-demo.vercel.app",
    // Kaynak sitede video yok: hero'su 120 JPEG'lik kare dizisi. Kartta
    // oynatabilmek için o kareler videoya dönüştürüldü (24 fps, 5 sn).
    video: "/demos/meridyen.webm",
    poster: "/demos/meridyen-poster.jpg",
    posterTime: 2.5,
    tags: ["Scroll Animasyon", "Sinematik"],
  },
];

export default function WorksSection() {
  // Aynı anda yalnızca tek video oynasın — altı videoyu birlikte oynatmak
  // hero'da düzelttiğimiz kare düşmesini geri getirir.
  const activeRef = useRef<HTMLVideoElement | null>(null);

  const play = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    if (activeRef.current && activeRef.current !== v) {
      activeRef.current.pause();
    }
    activeRef.current = v;
    void v.play().catch(() => {
      /* otomatik oynatma engellenebilir — poster karesi kalır, sorun değil */
    });
  }, []);

  const stop = useCallback((v: HTMLVideoElement | null, resetTo?: number) => {
    if (!v) return;
    v.pause();
    if (resetTo !== undefined) {
      try {
        v.currentTime = resetTo;
      } catch {
        /* seek her zaman mümkün olmayabilir */
      }
    }
    if (activeRef.current === v) activeRef.current = null;
  }, []);

  return (
    <section
      id="isler"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* zeminde yumuşak mor parıltı — bölümü diğerlerinden ayırır */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,63,228,0.14),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Vitrin"
          title="Demo sitelerimiz"
          highlight="Demo"
          subtitle="Farklı sektörler için tasarlayıp yayına aldığımız kurgu demo siteler. Kartın üzerine gelin, hero videosu oynasın — tıklayınca canlı demoya gidersiniz."
        />
        <p className="reveal mt-6 text-center">
          <a
            href="/isler"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-accent hover:bg-accent/20"
          >
            Gerçek müşteri işlerimiz: AYSA, BNS, Çolakoğlu, Dükkân Takip →
          </a>
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} onPlay={play} onStop={stop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  work,
  onPlay,
  onStop,
}: {
  work: Work;
  onPlay: (v: HTMLVideoElement | null) => void;
  onStop: (v: HTMLVideoElement | null, resetTo?: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1) Tembel kaynak: src ancak kart ekrana yaklaşınca atanır. Kart görüntüsü
  //    poster görselinden geliyor, o yüzden src gelene kadar da doğru görünür.
  //    preload="none" ile src atandıktan sonra bile oynatılana kadar bayt inmez.
  useEffect(() => {
    const el = cardRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !v.getAttribute("src")) {
          v.setAttribute("src", `${work.video}#t=${work.posterTime}`);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [work.video, work.posterTime]);

  // 2) Dokunmatik cihazda hover yok: kart ekranın ortasına geldiğinde oynat.
  //    Eşik 0.6 olduğu için pratikte aynı anda tek kart tetikleniyor.
  useEffect(() => {
    const el = cardRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // hover'lı cihazlarda ekrana girmek tek başına oynatmaz
          if (!canHover && !reduceMotion) onPlay(v);
        } else {
          onStop(v, work.posterTime);
        }
      },
      { threshold: canHover ? 0.01 : 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onPlay, onStop, work.posterTime]);

  const media = (
    <video
      ref={videoRef}
      // src bilerek verilmiyor — yukarıdaki gözlemci kart ekrana yaklaşınca
      // atıyor. Görüntü poster'dan geliyor, video yalnızca oynatılınca iniyor.
      poster={work.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
  );

  return (
    <div
      ref={cardRef}
      className="reveal"
      onPointerEnter={() => onPlay(videoRef.current)}
      onPointerLeave={() => onStop(videoRef.current, work.posterTime)}
    >
      <a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${work.title} — canlı siteyi yeni sekmede aç`}
        className={cn(
          "group relative block h-full overflow-hidden rounded-2xl",
          "border border-white/10 bg-white/[0.03] shadow-lg",
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50",
          "hover:shadow-[0_24px_60px_-18px_rgba(123,63,228,0.6)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        )}
      >
        {/* Medya alanı */}
        <div className="relative aspect-video overflow-hidden bg-black">
          {media}

          {/* okunurluk için alta doğru karartma */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

          {/* sektör etiketi */}
          <span className="absolute left-3 top-3 rounded-full border border-paper/25 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-paper">
            {work.sector}
          </span>

          {/* köşe oku */}
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-paper/25 bg-black/45 text-paper transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>

        {/* Gövde */}
        <div className="relative -mt-6 flex flex-col p-5 text-left">
          <h3 className="text-lg font-bold text-white">{work.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">
            {work.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {work.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors duration-300 group-hover:text-accent-light">
            Canlı Siteyi Aç
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>
      </a>
    </div>
  );
}

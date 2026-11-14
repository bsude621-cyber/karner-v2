"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { anamorphicVideos, type AnamorphicVideo } from "@/data/anamorphic";

/**
 * "Anamorfik videolarımız" — Demo sitelerimiz vitrininin altında. Kartlar
 * WorksSection'daki gibi davranır: üzerine gelince oynar (dokunmatikte kart
 * ekranın ortasına gelince), aynı anda tek video oynar. Poster ve video
 * kaynağı ancak kart ekrana yaklaşınca atanır — açılışta bayt indirmez.
 */
export default function AnamorphicSection() {
  const activeRef = useRef<HTMLVideoElement | null>(null);

  const play = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    if (activeRef.current && activeRef.current !== v) activeRef.current.pause();
    activeRef.current = v;
    void v.play().catch(() => {
      /* otomatik oynatma engellenebilir — poster karesi kalır */
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
    <section id="anamorfik" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,63,228,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Vitrin"
          title="Anamorfik videolarımız"
          highlight="Anamorfik"
          subtitle="Bina köşelerindeki ve AVM'lerdeki LED ekranlar için Blender'da ürettiğimiz 3D anamorfik videolar. Kartın üzerine gelin, video oynasın — görüntüler temsili mekânda önizlemedir."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {anamorphicVideos.map((v) => (
            <AnamorphicCard key={v.id} item={v} onPlay={play} onStop={stop} />
          ))}
        </div>

        <p className="reveal mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-white/45">
          Bu videolar tekniği göstermek için hazırladığımız bağımsız konsept
          çalışmalardır; adı geçen markalarla bir iş birliği veya sipariş
          ilişkisi yoktur.
        </p>

        <p className="reveal mt-8 text-center">
          <Link
            href="/hizmetler/3d-anamorfik-led-video"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-accent-light"
          >
            3D Anamorfik LED Video hizmetimiz
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

function AnamorphicCard({
  item,
  onPlay,
  onStop,
}: {
  item: AnamorphicVideo;
  onPlay: (v: HTMLVideoElement | null) => void;
  onStop: (v: HTMLVideoElement | null, resetTo?: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // Tembel poster + kaynak: kart ekrana 400 px yaklaşınca.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Dokunmatikte hover yok: kart ekranın ortasına gelince oynat.
  useEffect(() => {
    const el = cardRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!canHover && !reduceMotion) onPlay(v);
        } else {
          onStop(v, item.posterTime);
        }
      },
      { threshold: canHover ? 0.01 : 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onPlay, onStop, item.posterTime]);

  return (
    <div
      ref={cardRef}
      className="reveal"
      onPointerEnter={() => onPlay(videoRef.current)}
      onPointerLeave={() => onStop(videoRef.current, item.posterTime)}
    >
      <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-18px_rgba(123,63,228,0.6)]">
        <div className="relative aspect-video overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={near ? `${item.video}#t=${item.posterTime}` : undefined}
            poster={near ? item.poster : undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label={item.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-paper/25 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-paper">
            Anamorfik LED
          </span>
        </div>
        <figcaption className="relative -mt-6 flex flex-col p-5 text-left">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-white/60">{item.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

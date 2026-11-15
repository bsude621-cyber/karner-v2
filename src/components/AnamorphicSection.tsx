"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { anamorphicProjects, type AnamorphicProject } from "@/data/anamorphic";
import {
  createTouchVideo,
  ensureVideoSrc,
  isStarting,
  isTouchOnly,
  NEAR_MARGIN,
  pauseVideo,
  playVideo,
} from "@/lib/video";

/**
 * "Anamorfik videolarımız" — Demo sitelerimiz vitrininin altında. Her kart
 * bir proje (THY, Gratis); tıklayınca projenin video sayfası açılır
 * (/anamorfik-videolar/[slug]) ve oradaki tüm videolar oynatıcıyla izlenir.
 *
 * Kartın kendisi WorksSection gibi davranır: üzerine gelince projenin ilk
 * videosu sessiz oynar (dokunmatikte kart ekranın ortasına gelince), aynı
 * anda tek video oynar. Poster ve video kaynağı ancak kart ekrana yaklaşınca
 * atanır — açılışta bayt indirmez.
 */
export default function AnamorphicSection() {
  const activeRef = useRef<HTMLVideoElement | null>(null);

  // Aynı anda tek video. Oynat/durdur lib/video.ts'deki güvenli
  // yardımcılardan geçer: başlamakta olan videoya pause verilmez (iPad'de yan
  // yana iki kart aynı anda girince sekme kilitleniyordu).
  const play = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    if (activeRef.current && activeRef.current !== v) pauseVideo(activeRef.current);
    activeRef.current = v;
    playVideo(v);
  }, []);

  const stop = useCallback((v: HTMLVideoElement | null, resetTo?: number) => {
    if (!v) return;
    pauseVideo(v);
    // Kapak karesine dönüş yalnızca video gerçekten durmuşsa — başlamakta olan
    // videoda sarma da aynı kilitlenmeye yol açabilir.
    if (resetTo !== undefined && !isStarting(v)) {
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
          subtitle="Bina köşelerindeki ve AVM'lerdeki LED ekranlar için Blender'da ürettiğimiz 3D anamorfik videolar. Kartın üzerine gelin, video oynasın — tıklayınca tüm videoları izleyebileceğiniz sayfa açılır."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {anamorphicProjects.map((p) => (
            <AnamorphicCard key={p.slug} project={p} onPlay={play} onStop={stop} />
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
  project,
  onPlay,
  onStop,
}: {
  project: AnamorphicProject;
  onPlay: (v: HTMLVideoElement | null) => void;
  onStop: (v: HTMLVideoElement | null, resetTo?: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const first = project.videos[0];
  const count = project.videos.length;

  // Kart videosunun yaşam döngüsü (ayrıntı: lib/video.ts).
  //  Masaüstü (hover): poster + src kart 400 px yaklaşınca bir kez atanır;
  //    oynatma fareyle, ekrandan çıkınca durur ve kapak karesine döner.
  //  Dokunmatik: src yaklaşınca atanır, kart ortaya gelince (0,3 sn sonra)
  //    oynar, 400 px bölgesinden çıkınca 2 sn sonra bellekten boşaltılır —
  //    iOS'ta biriken videolar sekmeyi çökertiyordu.
  //  Dokunmatik + hareketi azalt: yalnızca poster, video hiç yüklenmez.
  useEffect(() => {
    const el = cardRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const canHover = !isTouchOnly();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch =
      canHover || reduceMotion
        ? null
        : createTouchVideo(v, first.src, project.posterTime, onPlay, (x) => onStop(x));

    const nearIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.getAttribute("poster")) v.setAttribute("poster", first.poster);
          if (touch) touch.near();
          else if (canHover) {
            ensureVideoSrc(v, first.src, project.posterTime);
            nearIo.disconnect();
          } else nearIo.disconnect(); // hareketi azalt: poster yeter
        } else touch?.far();
      },
      { rootMargin: NEAR_MARGIN },
    );
    nearIo.observe(el);

    const viewIo = new IntersectionObserver(
      ([entry]) => {
        if (touch) {
          if (entry.isIntersecting) touch.show();
          else touch.hide();
        } else if (!entry.isIntersecting) {
          onStop(v, project.posterTime);
        }
      },
      { threshold: canHover ? 0.01 : 0.6 },
    );
    viewIo.observe(el);

    return () => {
      nearIo.disconnect();
      viewIo.disconnect();
      touch?.dispose();
    };
  }, [onPlay, onStop, first.src, first.poster, project.posterTime]);

  return (
    <div
      ref={cardRef}
      className="reveal"
      onPointerEnter={() => onPlay(videoRef.current)}
      onPointerLeave={() => onStop(videoRef.current, project.posterTime)}
    >
      <Link
        href={`/anamorfik-videolar/${project.slug}`}
        aria-label={`${project.title} — ${count} videoyu izle`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-18px_rgba(123,63,228,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <video
            ref={videoRef}
            // src ve poster bilerek yok: yukarıdaki gözlemciler atıyor/boşaltıyor
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-paper/25 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-paper">
            Anamorfik LED
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-paper/25 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium text-paper">
            {count} video
          </span>
        </div>
        <div className="relative -mt-6 flex flex-col p-5 text-left">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-white/60">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors duration-300 group-hover:text-accent-light">
            {count > 1 ? `${count} videoyu izle` : "Videoyu izle"}
            <PlayCircle className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </div>
  );
}

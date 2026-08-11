"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import { cn } from "@/lib/utils";
import {
  Users,
  Briefcase,
  Trophy,
  Cpu,
  MapPin,
  Sparkles,
} from "lucide-react";

/**
 * Konum sınıfları yalnızca lg ve üstünde uygulanır — dağınık "asılı tabela"
 * düzeni ancak geniş ekranda çakışmadan sığıyor. Altındaki genişliklerde
 * kartlar normal akışta bir grid'e dizilir (bkz. SignBoard + sarmalayıcı).
 */
const signs = [
  {
    id: "kimlik",
    icon: MapPin,
    title: "Kimlik",
    lines: [
      "Yazılım + Medya şirketi",
      "Muğla & Ankara",
      "Yerel işletmelere dijital çözüm",
    ],
    className: "lg:left-[6%] lg:top-[14%] lg:rotate-[-4deg]",
  },
  {
    id: "ekip",
    icon: Users,
    title: "Ekip",
    lines: [
      "Sude — Strateji & Medya",
      "Beyza — Geliştirme & Mimari",
      "Ahmet — Teknik danışman",
    ],
    className: "lg:right-[7%] lg:top-[12%] lg:rotate-[3deg]",
  },
  {
    id: "hizmetler",
    icon: Briefcase,
    title: "Hizmetler",
    lines: [
      "Web & 3D siteler",
      "Mobil uygulama (Expo)",
      "AI video & ürün görseli",
    ],
    className: "lg:bottom-[16%] lg:left-[8%] lg:rotate-[2deg]",
  },
  {
    id: "vitrin",
    icon: Trophy,
    title: "Vitrin — AYSA",
    lines: [
      "ChatGPT'de öneriliyor",
      "Google AI Bakışı'nda görünür",
      "Organik aramada 2. sıra",
    ],
    className: "lg:bottom-[14%] lg:right-[6%] lg:rotate-[-3deg]",
  },
  {
    id: "stack",
    icon: Cpu,
    title: "Teknik Stack",
    lines: [
      "Next.js · Three.js · Expo",
      "Supabase · n8n · Claude API",
      "Veo · Kling · Firefly",
    ],
    className: "lg:left-1/2 lg:top-[8%] lg:-translate-x-1/2 lg:rotate-[-1deg]",
  },
  {
    id: "misyon",
    icon: Sparkles,
    title: "Misyon",
    lines: [
      "AI aramalarında görünürlük",
      "Tekrarlayan gelir modeli",
      "Otomasyon odaklı üretim",
    ],
    className: "lg:bottom-[8%] lg:left-1/2 lg:-translate-x-1/2 lg:rotate-[1deg]",
  },
];

function SignBoard({
  icon: Icon,
  title,
  lines,
  className,
  delay,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  className: string;
  delay: number;
}) {
  return (
    // initial'da opacity yok — kart içeriği sunucudan görünür gelsin
    <motion.div
      initial={{ y: 24, scale: 0.94 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay }}
      className={cn(
        // Dar ekranda akışta, grid hücresini doldurur.
        "group relative z-20 w-full",
        // lg'den itibaren dağınık tabela düzeni (konum sınıfları className'den).
        "lg:absolute lg:w-[300px] xl:w-[328px]",
        className
      )}
    >
      {/* asılı tabela çivisi — yalnızca dağınık düzende anlamlı, grid'de gizli */}
      <div className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-gradient-to-b from-accent/70 to-transparent lg:block" />
      <div className="absolute -top-6 left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(123,63,228,0.9)] ring-2 ring-accent/25 ring-offset-2 ring-offset-transparent lg:block" />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-[1px]",
          // gradient çerçeve (üstte parlak, alta doğru söner)
          "bg-gradient-to-b from-white/25 via-white/10 to-white/5",
          "shadow-[0_16px_50px_-16px_rgba(0,0,0,0.85)]",
          "transition-all duration-300 will-change-transform",
          "group-hover:-translate-y-1 group-hover:from-accent/60 group-hover:via-accent/25 group-hover:shadow-[0_22px_60px_-16px_rgba(123,63,228,0.55)]"
        )}
      >
        <div className="relative rounded-[15px] bg-gradient-to-b from-[#120a1c]/95 to-[#0a0611]/95 p-5 backdrop-blur-xl lg:p-6">
          {/* üst ışık çizgisi */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 ring-1 ring-inset ring-accent/30 transition-colors duration-300 group-hover:bg-accent/25 lg:h-10 lg:w-10">
              <Icon className="h-[18px] w-[18px] text-accent-light lg:h-5 lg:w-5" />
            </span>
            <h3 className="text-base font-semibold tracking-wide text-white lg:text-lg">
              {title}
            </h3>
          </div>

          <ul className="space-y-2.5">
            {lines.map((line, idx) => (
              <li
                key={line}
                className={cn(
                  "flex items-start gap-2.5 text-sm leading-relaxed lg:text-[15px]",
                  idx === 0 ? "text-white/85" : "text-white/60"
                )}
              >
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="relative">
      <DottedSurface className="min-h-screen w-full">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6">
          <motion.p
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm uppercase tracking-[0.35em] text-accent-light"
          >
            Hakkımızda
          </motion.p>

          <motion.div
            initial={{ scale: 0.96 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-30 flex h-28 w-full max-w-3xl items-center justify-center sm:h-36"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 rounded-full",
                "bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.28),transparent_65%)]",
                "blur-[36px]"
              )}
            />
            <TextHoverEffect text="KARNER" className="relative z-10 h-full w-full" />
          </motion.div>

          <motion.p
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative z-30 mt-4 max-w-md text-center text-sm text-white/50 sm:text-base"
          >
            KARNER — yazılım ve medyayı aynı dalgada birleştiren dijital stüdyo
          </motion.p>

          {/* Dar ekranda kartlar normal akışta bir grid'e dizilir. lg'de
              `contents` sayesinde bu sarmalayıcı kutu üretmez; kartlar yeniden
              bölümün kendisine göre mutlak konumlanır (dağınık tabela düzeni). */}
          <div className="relative z-30 mt-14 grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2 lg:contents">
            {signs.map((sign, i) => (
              <SignBoard
                key={sign.id}
                icon={sign.icon}
                title={sign.title}
                lines={sign.lines}
                className={sign.className}
                delay={0.15 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </DottedSurface>
    </section>
  );
}

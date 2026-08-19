"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";

/** Ana sayfadaki kısa Hakkımızda kutusu — detay /hakkimizda sayfasında.
 *  Arka plan tasarımı (DottedSurface) tam bölümdeki gibi korunur. */
export default function AboutTeaser() {
  return (
    <section id="hakkimizda" className="relative">
      <DottedSurface className="min-h-[60vh] w-full">
        <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-4 py-24 sm:px-6">
          <div className="reveal w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-white/5 p-[1px] shadow-[0_16px_50px_-16px_rgba(0,0,0,0.85)]">
            <div className="relative rounded-[15px] bg-gradient-to-b from-[#120a1c]/95 to-[#0a0611]/95 px-6 py-10 text-center backdrop-blur-xl sm:px-10">
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-accent-light">
                Hakkımızda
              </p>
              <p className="mx-auto mb-8 max-w-md text-base text-white/70 sm:text-lg">
                KARNER — yazılım ve medyayı aynı dalgada birleştiren dijital
                stüdyo
              </p>
              <Link href="/hakkimizda" className="btn btn-secondary group">
                Bizi Tanıyın
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </DottedSurface>
    </section>
  );
}

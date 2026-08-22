"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TeklifForm from "@/components/TeklifForm";

// Overlay yalnızca tıklanınca açılır — framer-motion'lı kodu ayrı chunk'ta
// kalsın, ana pakete girmesin diye dinamik yükleniyor.
const LocationOverlay = dynamic(() => import("@/components/LocationOverlay"), {
  ssr: false,
});

const PHONE = "0544 218 8645";
const PHONE_E164 = "+905442188645";
const EMAIL = "karneryazilim@gmail.com";

/**
 * İletişim bölümü — ana sayfada (#iletisim) ve /iletisim sayfasında BİREBİR aynı
 * (Sude 2026-08-21: "iletişim sayfasını ana sayfadakiyle aynı yap").
 * /iletisim'de başlık h1 olur (headingAs).
 */
export default function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <section
      id="iletisim"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,63,228,0.14),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          as={headingAs}
          eyebrow="İletişim"
          title="Birlikte çalışalım"
          highlight="çalışalım"
          subtitle="Projenizi konuşalım — mesajınız ekibimize anında düşer, kısa sürede dönüş yaparız."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Sol: iletişim bilgileri */}
          <div className="flex flex-col gap-5">
            <a
              href={`tel:${PHONE_E164}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <span className="accent-tile flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <Phone className="h-5 w-5 text-paper" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/60">Telefon</span>
                <span className="text-lg font-medium text-white">{PHONE}</span>
              </span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <span className="accent-tile flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <Mail className="h-5 w-5 text-paper" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/60">E-posta</span>
                <span className="text-lg font-medium text-white">{EMAIL}</span>
              </span>
            </a>

            {/* Lokasyonu gör — spiral overlay açar */}
            <button
              onClick={() => setOverlayOpen(true)}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 to-accent-2/10 p-5 text-left transition hover:border-accent"
            >
              <span className="accent-tile flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <MapPin className="h-5 w-5 text-paper" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/50">Lokasyon</span>
                <span className="text-lg font-medium text-white">Lokasyonu Gör →</span>
              </span>
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl transition-opacity group-hover:opacity-100" />
            </button>
          </div>

          {/* Sağ: form */}
          <TeklifForm className="reveal" />
        </div>
      </div>

      <LocationOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { PACKAGE_CATEGORIES } from "@/data/packages";

// Overlay yalnızca tıklanınca açılır — framer-motion'lı kodu ayrı chunk'ta
// kalsın, ana pakete girmesin diye dinamik yükleniyor.
const LocationOverlay = dynamic(() => import("@/components/LocationOverlay"), {
  ssr: false,
});

const PHONE = "0544 218 8645";
const PHONE_E164 = "+905442188645";
const EMAIL = "karneryazilim@gmail.com";

type Status = "idle" | "sending" | "ok" | "error";

/** ?paket=web-sitesi-vitrin → "Web sitesi / Vitrin" */
function packageLabel(slug: string): string | null {
  for (const cat of PACKAGE_CATEGORIES) {
    for (const t of cat.tiers) {
      if (`${cat.slug}-${t.slug}` === slug) return `${cat.name} / ${t.name}`;
    }
  }
  return null;
}

export default function ContactSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [paket, setPaket] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot — görünmez, boş kalmalı
    kvkk: false,
  });

  // /iletisim?paket=... → mesajı ve paket etiketini önceden doldur (sunucuda değil, istemcide)
  useEffect(() => {
    // URL sunucuda yok; hydration sonrası bir sonraki tick'te doldur (senkron setState yok)
    const t = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("paket");
      if (!slug) return;
      const label = packageLabel(slug);
      if (!label) return;
      setPaket(slug);
      setForm((f) =>
        f.message
          ? f
          : { ...f, message: `${label} paketi hakkında teklif almak istiyorum. ` },
      );
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const update =
    (key: "name" | "email" | "phone" | "message" | "website") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paket,
          page: window.location.pathname,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Mesaj gönderilemedi.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Bağlantı hatası. Lütfen e-posta veya telefonla ulaşın.");
      setStatus("error");
    }
  };

  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Teklif — ${form.name || "Web"}`,
  )}&body=${encodeURIComponent(
    `Ad Soyad: ${form.name}\nE-posta: ${form.email}\nTelefon: ${form.phone}\n\nMesaj:\n${form.message}`,
  )}`;

  return (
    <section
      id="iletisim"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,63,228,0.14),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
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
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <Phone className="h-5 w-5 text-white" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/60">
                  Telefon
                </span>
                <span className="text-lg font-medium text-white">{PHONE}</span>
              </span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <Mail className="h-5 w-5 text-white" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/60">
                  E-posta
                </span>
                <span className="text-lg font-medium text-white">{EMAIL}</span>
              </span>
            </a>

            {/* Lokasyonu gör — spiral overlay açar */}
            <button
              onClick={() => setOverlayOpen(true)}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 to-accent-2/10 p-5 text-left transition hover:border-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <MapPin className="h-5 w-5 text-white" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/50">
                  Lokasyon
                </span>
                <span className="text-lg font-medium text-white">
                  Lokasyonu Gör →
                </span>
              </span>
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl transition-opacity group-hover:opacity-100" />
            </button>
          </div>

          {/* Sağ: form */}
          {status === "ok" ? (
            <div
              role="status"
              className="reveal flex flex-col items-start justify-center gap-4 rounded-3xl border border-accent/40 bg-accent/[0.08] p-8 sm:p-10"
            >
              <CheckCircle2 className="h-10 w-10 text-accent-light" />
              <h3 className="text-2xl font-semibold text-white">Mesajınız ulaştı</h3>
              <p className="leading-relaxed text-white/70">
                Teşekkürler{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Talebiniz ekibimize
                iletildi; kısa sürede e-posta veya telefonla dönüş yapacağız. Acil bir konuysa{" "}
                <a href={`tel:${PHONE_E164}`} className="text-white underline underline-offset-4">
                  {PHONE}
                </a>{" "}
                numarasından ulaşabilirsiniz.
              </p>
              <Link href="/rehber" className="btn btn-secondary mt-2">
                Bu arada rehberlere göz atın
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
              noValidate={false}
            >
              <div className="grid gap-5">
                {paket ? (
                  <p className="rounded-xl border border-accent/30 bg-accent/[0.08] px-4 py-2.5 text-sm text-white/85">
                    Seçilen paket:{" "}
                    <strong className="text-white">{packageLabel(paket)}</strong>
                  </p>
                ) : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Ad Soyad"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                  <Field
                    label="Telefon"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
                <Field
                  label="E-posta"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
                <div>
                  <label htmlFor="mesaj" className="mb-2 block text-sm text-white/60">
                    Mesaj
                  </label>
                  <textarea
                    id="mesaj"
                    name="message"
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                    placeholder="Projenizden bahsedin..."
                  />
                </div>

                {/* Honeypot — insanlar görmez, botlar doldurur */}
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                  <label>
                    Web siteniz
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={update("website")}
                    />
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm text-white/65">
                  <input
                    type="checkbox"
                    name="kvkk"
                    required
                    checked={form.kvkk}
                    onChange={(e) => setForm((f) => ({ ...f, kvkk: e.target.checked }))}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#7B3FE4]"
                  />
                  <span>
                    <Link
                      href="/gizlilik"
                      className="text-white underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      Gizlilik ve KVKK aydınlatma metnini
                    </Link>{" "}
                    okudum; iletişim bilgilerimin talebime dönüş yapılması amacıyla işlenmesini kabul
                    ediyorum.
                  </span>
                </label>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {error}{" "}
                      <a href={mailtoFallback} className="underline underline-offset-4">
                        E-posta ile gönder
                      </a>
                    </span>
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-white transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(123,63,228,0.6)] disabled:cursor-wait disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {status === "sending" ? "Gönderiliyor…" : "Gönder"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <LocationOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name ?? label;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white/60">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}

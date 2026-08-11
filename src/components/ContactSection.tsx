"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import LocationOverlay from "@/components/LocationOverlay";
import SectionHeading from "@/components/ui/section-heading";

const PHONE = "0544 218 8645";
const EMAIL = "karneryazilim@gmail.com";

export default function ContactSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Yeni Teklif — ${form.name || "Web"}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${form.name}\nE-posta: ${form.email}\nTelefon: ${form.phone}\n\nMesaj:\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

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
          subtitle="Projenizi konuşalım — birkaç saat içinde dönüş yapıyoruz."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Sol: iletişim bilgileri */}
          <div className="flex flex-col gap-5">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
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
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Ad Soyad"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
                <Field
                  label="Telefon"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                />
              </div>
              <Field
                label="E-posta"
                type="email"
                value={form.email}
                onChange={update("email")}
                required
              />
              <div>
                <label className="mb-2 block text-sm text-white/60">Mesaj</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="Projenizden bahsedin..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-white transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(123,63,228,0.6)]"
              >
                <Send className="h-4 w-4" />
                Gönder
              </button>
            </div>
          </motion.form>
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
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}

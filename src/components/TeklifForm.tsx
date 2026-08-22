"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { PACKAGE_CATEGORIES } from "@/data/packages";

const PHONE = "0544 218 8645";
const PHONE_E164 = "+905442188645";
const EMAIL = "karneryazilim@gmail.com";

type Status = "idle" | "sending" | "ok" | "error";

/** ?paket=web-sitesi-baslangic → "Web sitesi / Başlangıç" */
function packageLabel(slug: string): string | null {
  for (const cat of PACKAGE_CATEGORIES) {
    for (const t of cat.tiers) {
      if (`${cat.slug}-${t.slug}` === slug) return `${cat.name} / ${t.name}`;
    }
  }
  return null;
}

/**
 * Teklif formu — /api/teklif → n8n (Telegram + tablo). Ana sayfa iletişim bölümü
 * ve /iletisim sayfası aynı bileşeni kullanır.
 */
export default function TeklifForm({ className = "" }: { className?: string }) {
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

  // /iletisim?paket=... → mesajı ve paket etiketini önceden doldur (istemcide)
  useEffect(() => {
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
        body: JSON.stringify({ ...form, paket, page: window.location.pathname }),
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

  if (status === "ok") {
    return (
      <div
        role="status"
        className={`flex flex-col items-start justify-center gap-4 rounded-3xl border border-accent/40 bg-accent/[0.08] p-8 sm:p-10 ${className}`}
      >
        <CheckCircle2 className="h-10 w-10 text-accent-light" />
        <h3 className="text-2xl font-semibold text-white">Mesajınız ulaştı</h3>
        <p className="leading-relaxed text-white/70">
          Teşekkürler{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Talebiniz ekibimize iletildi;
          kısa sürede e-posta veya telefonla dönüş yapacağız. Acil bir konuysa{" "}
          <a href={`tel:${PHONE_E164}`} className="text-white underline underline-offset-4">
            {PHONE}
          </a>{" "}
          numarasından ulaşabilirsiniz.
        </p>
        <Link href="/rehber" className="btn btn-secondary mt-2">
          Bu arada rehberlere göz atın
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9 ${className}`}
    >
      <div className="grid gap-5">
        {paket ? (
          <p className="rounded-xl border border-accent/30 bg-accent/[0.08] px-4 py-2.5 text-sm text-white/85">
            Seçilen paket: <strong className="text-white">{packageLabel(paket)}</strong>
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
            placeholder="İşletmeniz, ihtiyacınız, varsa mevcut siteniz — kısaca yazın yeter."
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
          className="accent-cta inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-paper transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(123,63,228,0.6)] disabled:cursor-wait disabled:opacity-70"
        >
          <Send className="h-4 w-4" />
          {status === "sending" ? "Gönderiliyor…" : "Gönder"}
        </button>
      </div>
    </form>
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

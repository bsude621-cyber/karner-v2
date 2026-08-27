"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SOCIAL_PROFILES } from "@/lib/site";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";

const PHONE = "0544 218 8645";
const EMAIL = "karneryazilim@gmail.com";

const footerLinks = [
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İşlerimiz", href: "/isler" },
      { label: "Sektörler", href: "/sektor" },
      { label: "Süreç", href: "/surec" },
      { label: "Paketler", href: "/paketler" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Gizlilik / KVKK", href: "/gizlilik" },
    ],
  },
  {
    title: "Hizmetler",
    links: [
      { label: "Tüm Hizmetler", href: "/hizmetler" },
      { label: "Web Geliştirme", href: "/hizmetler/web-sitesi-gelistirme" },
      { label: "Mobil Uygulama", href: "/hizmetler/mobil-uygulama" },
      { label: "AI Video & Reklam", href: "/hizmetler/ai-video-reklam" },
      { label: "AI Ürün Görseli", href: "/hizmetler/ai-urun-gorseli" },
      { label: "SEO / GEO / AEO", href: "/hizmetler/seo-geo-aeo" },
      { label: "Otomasyon", href: "/hizmetler/otomasyon-sistemleri" },
      { label: "Marka & Tasarım", href: "/hizmetler/marka-grafik-tasarim" },
      { label: "Sosyal Medya İçerik", href: "/hizmetler/sosyal-medya-icerik-yonetimi" },
    ],
  },
  {
    title: "Rehber",
    links: [
      { label: "Tüm rehberler", href: "/rehber" },
      { label: "3D Web Sitesi", href: "/3d-web-sitesi" },
      { label: "AI Reklam Videosu", href: "/yapay-zeka-reklam-videosu" },
      {
        label: "Yapay Zekâ Aramasında Görünmek",
        href: "/yapay-zeka-aramasinda-gorunmek",
      },
      { label: "llms.txt nedir?", href: "/rehber/llms-txt-nedir" },
      { label: "ChatGPT firmamı neden önermiyor?", href: "/rehber/chatgpt-firmami-neden-onermiyor" },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-(--footer-accent)" />,
    text: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <Phone size={18} className="text-(--footer-accent)" />,
    text: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
  },
  {
    icon: <MapPin size={18} className="text-(--footer-accent)" />,
    text: "Türkiye geneli",
    href: "/#iletisim",
  },
];

// Marka ikonları lucide'da yok (1.x'te kaldırıldı) — satır içi SVG, stroke = currentColor.
const SOCIAL_ICONS: Record<(typeof SOCIAL_PROFILES)[number]["id"], React.ReactNode> = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22.5 7.2a2.9 2.9 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1 12a30 30 0 0 0 .5 4.8 2.9 2.9 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 23 12a30 30 0 0 0-.5-4.8z" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </svg>
  ),
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
};

const socialLinks = SOCIAL_PROFILES.map((p) => ({ ...p, icon: SOCIAL_ICONS[p.id] }));

export default function Footer() {
  return (
    <footer className="relative m-4 overflow-hidden rounded-3xl bg-(--footer-surface) sm:m-6">
      <div className="relative z-40 mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-emblem.png"
                alt="KARNER"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="text-xl font-bold tracking-[0.2em] text-paper">
                KARNER
              </span>
            </div>
            <p className="text-sm leading-relaxed text-paper/55">
              Yazılım ve medyayı bir araya getiren dijital stüdyo. Web, mobil,
              AI video ve görsel, SEO/GEO/AEO, otomasyon, marka ve sosyal medya
              içeriği — tek ekip, uçtan uca.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-base font-semibold text-paper">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-paper/55">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-(--footer-accent)"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-base font-semibold text-paper">İletişim</h4>
            <ul className="space-y-3 text-sm text-paper/55">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  {item.icon}
                  <a
                    href={item.href}
                    className="transition-colors hover:text-(--footer-accent)"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-paper/10" />

        {/* Alt şerit + KARNER dekoru */}
        <div className="relative">
          <div className="relative z-30 flex flex-col items-center justify-between gap-3 text-sm text-paper/60 md:flex-row">
            <div className="flex gap-5">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-(--footer-accent)"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "me noreferrer" : undefined}
                >
                  {icon}
                </a>
              ))}
            </div>

            <p className="text-center md:text-right">
              © {new Date().getFullYear()} KARNER. Tüm hakları saklıdır.
            </p>
          </div>

          {/* KARNER — enine tam, boyuna sıkıştırılmış */}
          <div className="relative z-10 mt-4 hidden h-20 w-full overflow-hidden lg:block">
            <div className="h-[200%] w-full origin-top scale-y-50">
              <TextHoverEffect text="KARNER" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

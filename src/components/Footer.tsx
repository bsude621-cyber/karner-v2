"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Share2, GitBranch, Globe } from "lucide-react";
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
      { label: "Hakkımızda", href: "#hakkimizda" },
      { label: "Hizmetler", href: "#hizmetler" },
      { label: "İletişim", href: "#iletisim" },
      { label: "AYSA Vitrin", href: "#hizmetler" },
    ],
  },
  {
    title: "Hizmetler",
    links: [
      { label: "Web Geliştirme", href: "/hizmetler/web-sitesi-gelistirme" },
      { label: "Mobil Uygulama", href: "/hizmetler/mobil-uygulama" },
      { label: "AI Video & Reklam", href: "/hizmetler/ai-video-reklam" },
      { label: "AI Ürün Görseli", href: "/hizmetler/ai-urun-gorseli" },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-accent" />,
    text: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <Phone size={18} className="text-accent" />,
    text: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
  },
  {
    icon: <MapPin size={18} className="text-accent" />,
    text: "Muğla & Ankara",
    href: "#iletisim",
  },
];

const socialLinks = [
  {
    icon: <Share2 size={18} />,
    label: "Sosyal",
    href: "#iletisim",
  },
  {
    icon: <GitBranch size={18} />,
    label: "GitHub",
    href: "https://github.com/bsude621-cyber",
  },
  {
    icon: <Globe size={18} />,
    label: "Web",
    href: "https://karner-site.vercel.app",
  },
];

export default function Footer() {
  return (
    <footer className="relative m-4 overflow-hidden rounded-3xl bg-background/40 sm:m-6">
      <div className="relative z-40 mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="KARNER"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg object-cover ring-1 ring-white/10"
              />
              <span className="text-xl font-bold tracking-[0.2em] text-white">
                KARNER
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              Yazılım ve medyayı bir araya getiren dijital stüdyo. 3D, WebGL ve
              AI ile markalar için sıra dışı deneyimler tasarlıyoruz.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-base font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/55">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-base font-semibold text-white">İletişim</h4>
            <ul className="space-y-3 text-sm text-white/55">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  {item.icon}
                  <a
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-white/10" />

        {/* Alt şerit + KARNER dekoru */}
        <div className="relative">
          <div className="relative z-30 flex flex-col items-center justify-between gap-3 text-sm text-white/60 md:flex-row">
            <div className="flex gap-5">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-accent"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
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

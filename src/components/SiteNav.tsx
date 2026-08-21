"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İşlerimiz", href: "/isler" },
  { label: "Paketler", href: "/paketler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Rehber", href: "/rehber" },
  { label: "İletişim", href: "/iletisim" },
];

/**
 * Site geneli sabit menü — her sayfada, kaydırınca kaybolmaz.
 * Ana sayfanın tepesinde şeffaf (hero'nun üstünde), kaydırınca ve alt sayfalarda
 * buzlu koyu zemin. Mobilde hamburger.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Sayfa değişince menüyü kapat
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-b border-white/10 bg-background/90 md:bg-background/75 md:backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="KARNER ana sayfa">
          <Image
            src="/logo-emblem.png"
            alt="KARNER"
            width={44}
            height={44}
            className="h-10 w-10 object-contain drop-shadow-lg"
            priority
          />
          <span className="text-lg font-bold tracking-[0.25em] text-white">KARNER</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
        <nav aria-label="Site" className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative px-1 transition-colors duration-300 hover:text-white ${
                  active ? "text-white" : ""
                }`}
              >
                <span className="relative z-10 transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_14px_rgba(123,63,228,0.95)]">
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobil-menu"
          aria-label="Site (mobil)"
          className="border-t border-white/10 bg-background/95 px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-white/5 py-3 text-base text-white/85 last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const NAV = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İşlerimiz", href: "/isler" },
  { label: "Rehberler", href: "/rehber" },
  { label: "Paketler", href: "/paketler" },
  { label: "İletişim", href: "/iletisim" },
];

/** Alt sayfaların ortak üst barı — logo + masaüstünde menü, mobilde geri bağlantısı. */
export default function SubpageHeader({
  backHref = "/",
  backLabel = "Ana Sayfa",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-background/70 px-6 py-4 backdrop-blur-md sm:px-10">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo-emblem.png"
          alt="KARNER"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <span className="text-lg font-bold tracking-[0.2em]">KARNER</span>
      </Link>
      <nav aria-label="Site" className="hidden items-center gap-6 text-sm text-white/65 md:flex">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="transition hover:text-white">
            {n.label}
          </Link>
        ))}
      </nav>
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white md:hidden"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>
    </header>
  );
}

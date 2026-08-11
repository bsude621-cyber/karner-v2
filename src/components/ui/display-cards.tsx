"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type DisplayCardItem = {
  slug: string;
  tag: string;
  title: string;
  description?: string;
  imageSrc: string;
  href: string;
};

// Literal Tailwind sınıfları (JIT statik tarama için dinamik üretilemez).
// Deck merkeze yakın dursun diye negatif başlayıp pozitife gidiyor.
const OFFSETS = [
  "-translate-x-[8rem] -translate-y-[7.5rem]",
  "-translate-x-[4.8rem] -translate-y-[4.5rem]",
  "-translate-x-[1.6rem] -translate-y-[1.5rem]",
  "translate-x-[1.6rem] translate-y-[1.5rem]",
  "translate-x-[4.8rem] translate-y-[4.5rem]",
  "translate-x-[8rem] translate-y-[7.5rem]",
];

function DisplayCard({
  item,
  className,
  front,
}: {
  item: DisplayCardItem;
  className?: string;
  front?: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.title} detayları`}
      className={cn(
        "group/card relative flex h-44 w-[21rem] -skew-y-[8deg] select-none flex-col justify-end overflow-hidden rounded-2xl border-2 border-white/15 px-5 py-4 shadow-xl transition-all duration-700 sm:h-48 sm:w-[23rem]",
        // istiflenmiş kartların sağ kenarını arkaya eritme (deck hissi)
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[15rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        // önde olmayan kartlar gri; hover'da renkleniyor, öne kalkıyor
        front ? "grayscale-0" : "grayscale hover:grayscale-0",
        "hover:z-50 hover:-translate-y-12 hover:border-accent hover:after:opacity-0",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageSrc}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* marka moru tint + okunurluk karartması */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/80 to-accent-2/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* sağ üstte git ikonu */}
      <span className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition group-hover/card:bg-white/25">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <div className="relative z-10">
        <span className="mb-2 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          {item.tag}
        </span>
        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          {item.title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          Detayları Gör
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function DisplayCards({ items }: { items: DisplayCardItem[] }) {
  return (
    // mobilde sığsın diye deck ölçekleniyor; yükseklik istif için ayrılıyor
    <div className="flex min-h-[26rem] w-full items-center justify-center overflow-hidden sm:min-h-[30rem]">
      <div className="scale-[0.62] sm:scale-90 lg:scale-100">
        <div className="grid place-items-center [grid-template-areas:'stack'] [&>*]:[grid-area:stack]">
          {items.map((item, i) => (
            <DisplayCard
              key={item.slug}
              item={item}
              front={i === items.length - 1}
              className={OFFSETS[i] ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

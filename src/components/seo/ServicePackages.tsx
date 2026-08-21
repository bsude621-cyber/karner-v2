import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { PackageCategory } from "@/data/packages";

const PREVIEW_ITEMS = 4;

/**
 * Hizmet sayfası altı — kompakt paket özeti.
 * Tam karşılaştırma /paketler#kategori'de; burada ad + tagline + kim için + ilk 4 "dâhil".
 * Fiyat yazılmaz (Sude kuralı, 2026-08-20).
 */
export default function ServicePackages({ category }: { category: PackageCategory }) {
  return (
    <section aria-labelledby="paketler-baslik" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent-light">Paketler</p>
          <h2 id="paketler-baslik" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Hangi kapsam size uygun?
          </h2>
          <p className="mt-3 leading-relaxed text-white/65">{category.intro}</p>
        </div>
        <Link
          href={`/paketler#${category.slug}`}
          className="group inline-flex items-center gap-2 text-sm text-accent-light transition hover:text-white"
        >
          Tüm paketleri karşılaştır
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {category.tiers.map((t) => {
          const preview = t.includes.slice(0, PREVIEW_ITEMS);
          const rest = t.includes.length - preview.length;
          return (
            <article
              key={t.slug}
              className={`flex flex-col rounded-3xl border p-6 ${
                t.highlight
                  ? "border-accent/60 bg-gradient-to-b from-accent/15 to-accent-2/5 shadow-[0_0_40px_-12px_rgba(123,63,228,0.6)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {t.highlight ? (
                <span className="mb-3 inline-block self-start rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  Önerimiz
                </span>
              ) : null}
              <h3 className="text-xl font-semibold text-white">{t.name}</h3>
              <p className="mt-1.5 text-sm text-white/60">{t.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                <span className="text-white/50">Kim için: </span>
                {t.audience}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {preview.map((it) => (
                  <li key={it} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    {it}
                  </li>
                ))}
              </ul>
              {rest > 0 ? (
                <Link
                  href={`/paketler#${category.slug}-${t.slug}`}
                  className="mt-3 text-sm text-white/50 underline-offset-4 transition hover:text-accent-light hover:underline"
                >
                  +{rest} madde daha — tam kapsam
                </Link>
              ) : null}
              <Link
                href={`/iletisim?paket=${category.slug}-${t.slug}`}
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 font-medium transition ${
                  t.highlight
                    ? "bg-gradient-to-r from-accent to-accent-2 text-white hover:scale-[1.02]"
                    : "border border-white/20 text-white hover:border-accent/60"
                }`}
              >
                Teklif iste
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-white/45">
        Paketler kapsamı netleştirir; fiyat keşif görüşmesinden sonra yazılı teklifle verilir.
      </p>
    </section>
  );
}

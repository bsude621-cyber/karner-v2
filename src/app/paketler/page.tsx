import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { PACKAGES, PACKAGE_FAQ } from "@/data/packages";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/paketler";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Web Sitesi Paketleri ve Fiyatları — Vitrin, Bölgesel Lider | KARNER";
const DESCRIPTION =
  "KARNER web sitesi paketleri: Vitrin (tek sayfa), Bölgesel Lider (5-8 sayfa + sıralanma altyapısı + aylık takip), Dijital Tekel (+ yapay zekâ görünürlüğü + otomasyon). Başlangıç fiyatları ve kapsam açık; net teklif keşif sonrası.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Paketler", href: PATH },
];

const tl = (n: number) => new Intl.NumberFormat("tr-TR").format(n);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      mainEntity: { "@id": `${pageUrl}#catalog` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${pageUrl}#catalog`,
      name: "KARNER web sitesi paketleri",
      url: pageUrl,
      itemListElement: PACKAGES.map((p) => ({
        "@type": "Offer",
        "@id": `${pageUrl}#${p.slug}`,
        name: `${p.name} paketi`,
        description: p.tagline,
        url: `${pageUrl}#${p.slug}`,
        offeredBy: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Türkiye" },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: p.setupFrom,
          minPrice: p.setupFrom,
          priceCurrency: "TRY",
          valueAddedTaxIncluded: false,
          description: "Başlangıç fiyatı; net teklif keşif sonrası kapsamla belirlenir.",
        },
        itemOffered: {
          "@type": "Service",
          name: `${p.name} — web sitesi paketi`,
          description: p.audience,
          provider: { "@id": `${SITE_URL}/#organization` },
          serviceType: "Web sitesi geliştirme ve arama görünürlüğü",
        },
      })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: PACKAGE_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function PackagesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">Paketler</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Web sitesi paketleri: kapsam açık, fiyat başlangıç
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Üç paket, üç farklı hedef: görünür olmak, bölgesinde öne çıkmak, kategoriyi kapatmak.
            </strong>{" "}
            Fiyatlar başlangıç fiyatıdır; keşif görüşmesinden sonra kapsam yazılı netleşir ve net teklif
            verilir. Fiyatlara KDV dâhil değildir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className={`flex flex-col rounded-3xl border p-7 ${
                p.highlight
                  ? "border-accent/60 bg-gradient-to-b from-accent/15 to-accent-2/5 shadow-[0_0_40px_-12px_rgba(123,63,228,0.6)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {p.highlight ? (
                <span className="mb-4 inline-block self-start rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  Ana ürün
                </span>
              ) : null}
              <h2 className="text-2xl font-semibold text-white">{p.name}</h2>
              <p className="mt-2 text-sm text-white/60">{p.tagline}</p>
              <p className="mt-5">
                <span className="text-3xl font-bold text-white">₺{tl(p.setupFrom)}</span>
                <span className="text-white/60">&apos;den başlayan kurulum</span>
              </p>
              {p.monthlyFrom ? (
                <p className="mt-1 text-sm text-white/60">
                  + ₺{tl(p.monthlyFrom)}/ay bakım{p.monthlyOptional ? " (opsiyonel)" : ""}
                </p>
              ) : null}
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                <span className="text-white/50">Kim için: </span>
                {p.audience}
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.includes.map((it) => (
                  <li key={it} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    {it}
                  </li>
                ))}
              </ul>
              {p.excludes.length ? (
                <ul className="mt-4 space-y-2">
                  {p.excludes.map((it) => (
                    <li key={it} className="flex gap-3 text-sm leading-relaxed text-white/45">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              ) : null}
              {p.guarantee ? (
                <div className="mt-5 rounded-xl border border-white/10 bg-background/40 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-light">Taahhüt sınırı</p>
                  {p.guarantee.yes.map((g) => (
                    <p key={g} className="mt-2 text-white/80">✓ {g}</p>
                  ))}
                  {p.guarantee.no.map((g) => (
                    <p key={g} className="mt-1 text-white/50">✗ {g}</p>
                  ))}
                </div>
              ) : null}
              <Link
                href={`/iletisim?paket=${p.slug}`}
                className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition ${
                  p.highlight
                    ? "bg-gradient-to-r from-accent to-accent-2 text-white hover:scale-[1.02]"
                    : "border border-white/20 text-white hover:border-accent/60"
                }`}
              >
                Teklif iste
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/50">
          Mobil uygulama, AI video, AI ürün görseli ve otomasyon işleri kapsamına göre ayrı teklif
          edilir; paketler yalnızca web sitesi ve arama görünürlüğü için çerçevedir.
        </p>

        <div className="mx-auto max-w-3xl">
          <FaqList items={PACKAGE_FAQ} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

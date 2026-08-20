import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, ArrowRight } from "lucide-react";
import { PACKAGE_CATEGORIES, PACKAGE_FAQ } from "@/data/packages";
import { getService } from "@/data/services";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/paketler";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Hizmet Paketleri — Web, Mobil, AI Video, SEO/GEO/AEO, Otomasyon | KARNER";
const DESCRIPTION =
  "KARNER'ın sekiz hizmet kategorisi için paket kapsamları: web sitesi, mobil uygulama, AI video, AI ürün görseli, SEO/GEO/AEO, otomasyon, marka tasarımı, sosyal medya içeriği. Her pakette neyin dâhil, neyin hariç olduğu açık; teklif keşif sonrası yazılı.";

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
      name: "KARNER hizmet paketleri",
      url: pageUrl,
      itemListElement: PACKAGE_CATEGORIES.map((cat) => ({
        "@type": "OfferCatalog",
        "@id": `${pageUrl}#${cat.slug}`,
        name: `${cat.name} paketleri`,
        url: `${pageUrl}#${cat.slug}`,
        itemListElement: cat.tiers.map((t) => ({
          "@type": "Offer",
          "@id": `${pageUrl}#${cat.slug}-${t.slug}`,
          name: `${t.name} — ${cat.name}`,
          description: t.tagline,
          url: `${pageUrl}#${cat.slug}-${t.slug}`,
          offeredBy: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Türkiye" },
          itemOffered: {
            "@type": "Service",
            name: `${t.name} — ${cat.name}`,
            description: t.audience,
            provider: { "@id": `${SITE_URL}/#organization` },
            isRelatedTo: { "@id": `${SITE_URL}/hizmetler/${cat.serviceSlug}#service` },
          },
        })),
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
            Her hizmet için paketler: kapsam açık, teklif yazılı
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Sekiz kategori, her birinde kapsam paketleri: neyin dâhil, neyin hariç olduğu baştan yazılı.
            </strong>{" "}
            Paketler kapsamı netleştirir; fiyat keşif görüşmesinden sonra yazılı teklifle verilir.
          </p>
          <nav aria-label="Kategoriler" className="mt-8 flex flex-wrap gap-2">
            {PACKAGE_CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-accent/60 hover:text-white"
              >
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {PACKAGE_CATEGORIES.map((cat) => {
        const service = getService(cat.serviceSlug);
        return (
          <section
            key={cat.slug}
            id={cat.slug}
            className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold text-white">{cat.name}</h2>
                <p className="mt-3 leading-relaxed text-white/65">{cat.intro}</p>
              </div>
              {service ? (
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="group inline-flex items-center gap-2 text-sm text-accent-light transition hover:text-white"
                >
                  Hizmet sayfası <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ) : null}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {cat.tiers.map((t) => (
                <article
                  key={t.slug}
                  id={`${cat.slug}-${t.slug}`}
                  className={`flex flex-col rounded-3xl border p-7 ${
                    t.highlight
                      ? "border-accent/60 bg-gradient-to-b from-accent/15 to-accent-2/5 shadow-[0_0_40px_-12px_rgba(123,63,228,0.6)]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {t.highlight ? (
                    <span className="mb-4 inline-block self-start rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                      Önerdiğimiz başlangıç
                    </span>
                  ) : null}
                  <h3 className="text-2xl font-semibold text-white">{t.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{t.tagline}</p>
                  <p className="mt-5 text-sm leading-relaxed text-white/70">
                    <span className="text-white/50">Kim için: </span>
                    {t.audience}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent-light">Dâhil</p>
                  <ul className="mt-2 space-y-2.5">
                    {t.includes.map((it) => (
                      <li key={it} className="flex gap-3 text-sm leading-relaxed text-white/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {t.excludes.length ? (
                    <>
                      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/40">Dâhil değil</p>
                      <ul className="mt-2 space-y-2">
                        {t.excludes.map((it) => (
                          <li key={it} className="flex gap-3 text-sm leading-relaxed text-white/45">
                            <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {t.guarantee ? (
                    <div className="mt-5 rounded-xl border border-white/10 bg-background/40 p-4 text-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-accent-light">Taahhüt sınırı</p>
                      {t.guarantee.yes.map((g) => (
                        <p key={g} className="mt-2 text-white/80">✓ {g}</p>
                      ))}
                      {t.guarantee.no.map((g) => (
                        <p key={g} className="mt-1 text-white/50">✗ {g}</p>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href={`/iletisim?paket=${cat.slug}-${t.slug}`}
                    className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition ${
                      t.highlight
                        ? "bg-gradient-to-r from-accent to-accent-2 text-white hover:scale-[1.02]"
                        : "border border-white/20 text-white hover:border-accent/60"
                    }`}
                  >
                    Teklif iste
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <FaqList items={PACKAGE_FAQ} />
      </section>
      <Footer />
    </main>
  );
}

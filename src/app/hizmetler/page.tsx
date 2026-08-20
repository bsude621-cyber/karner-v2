import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { PILLAR_3D } from "@/data/pillar-3d";
import { PILLAR_AI_VIDEO } from "@/data/pillar-ai-video";
import { PILLAR_GEO } from "@/data/pillar-geo";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/hizmetler";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);

const TITLE = "Hizmetler — Web, Mobil, AI Video, SEO/GEO/AEO, Otomasyon | KARNER";
const DESCRIPTION =
  "KARNER'ın yedi hizmet alanı tek sayfada: 3D web sitesi geliştirme, mobil uygulama, AI video ve reklam, AI ürün görseli, SEO/GEO/AEO, iş akışı otomasyonu, marka ve grafik tasarım.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hizmetler", href: PATH },
];

const guides = [
  { meta: PILLAR_3D, label: "Rehber" },
  { meta: PILLAR_AI_VIDEO, label: "Rehber" },
  { meta: PILLAR_GEO, label: "Rehber" },
];

/**
 * Hub sayfası: CollectionPage + ItemList(Service) + BreadcrumbList.
 * Tüm hizmet detayları buraya, burası ana sayfaya bağlanır (hub-spoke).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      datePublished: dates.published,
      dateModified: dates.modified,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#list`,
      name: "KARNER hizmetleri",
      numberOfItems: services.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/hizmetler/${s.slug}`,
        name: s.title,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/hizmetler/${s.slug}#service`,
          name: s.title,
          description: s.summary,
          url: `${SITE_URL}/hizmetler/${s.slug}`,
          serviceType: s.title,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

export default function ServicesHubPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Ana Sayfa
        </Link>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Hizmetler
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Yazılım ve medyada yedi hizmet, tek ekip
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              KARNER; web, mobil, yapay zekâ destekli medya, arama görünürlüğü
              ve otomasyonu aynı çatıda sunan bir yazılım ve medya ajansıdır.
            </strong>{" "}
            Aşağıdaki her hizmetin kendi sayfasında kapsam, çalışma biçimi ve
            sık sorulan sorular ayrıntılı anlatılır.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="sr-only">Hizmet listesi</h2>
        <ol className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/50 hover:bg-white/[0.06]"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-accent-light">
                  {s.no} — {s.tag}
                </span>
                <span className="mt-3 flex items-center justify-between text-xl font-semibold text-white">
                  {s.title}
                  <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-accent-light" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-white/65">
                  {s.summary}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="rehberler" className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <h2 className="text-2xl font-semibold text-white">
          Hizmetleri anlatan rehberler
        </h2>
        <p className="mt-2 max-w-2xl text-white/65">
          Karar vermeden önce konuyu anlamak isteyenler için teknik rehberler —
          satış metni değil, nasıl çalıştığının açıklaması.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {guides.map(({ meta, label }) => (
            <Link
              key={meta.slug}
              href={`/${meta.slug}`}
              className="group rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 transition hover:border-accent/60"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent-light">
                {label}
              </span>
              <span className="mt-2 block font-medium text-white">
                {meta.title}
              </span>
              <span className="mt-2 block text-sm text-white/60">
                {meta.seoDescription}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

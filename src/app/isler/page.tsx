import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cases } from "@/data/cases";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/isler";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "İşlerimiz — Gerçek Müşteri Siteleri ve Otomasyon Vakaları | KARNER";
const DESCRIPTION =
  "KARNER'ın yayında olan gerçek işleri: AYSA Endüstriyel Temizlik, BNS Enerji & Doğalgaz, Çolakoğlu Emlak siteleri ve Dükkân Takip Telegram botu. Ne kurduk, nasıl ölçtük, ne gördük — tarihli gözlemlerle.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "İşlerimiz", href: PATH },
];

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
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      mainEntity: { "@id": `${pageUrl}#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#list`,
      name: "KARNER işleri",
      numberOfItems: cases.length,
      itemListElement: cases.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.client,
        url: `${SITE_URL}/isler/${c.slug}`,
      })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

export default function CasesHubPage() {
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
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">İşlerimiz</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Yayında olan gerçek işler, tarihli gözlemlerle
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Burada vitrin değil vaka var: her iş için sorun, kurulan yapı ve ölçtüğümüz sonuç.
            </strong>{" "}
            Arama sonuçları değişir; bu yüzden gözlemleri tarihiyle yazıyor, kalıcı vaat gibi
            sunmuyoruz. Sektörel demo sitelerimiz ana sayfadaki &ldquo;demo&rdquo; vitrininde ayrı durur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <ol className="grid gap-6 sm:grid-cols-2">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/isler/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/50 hover:bg-white/[0.06]"
              >
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  width={c.image.width}
                  height={c.image.height}
                  className="aspect-[16/10] w-full object-cover object-top"
                />
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent-light">
                    {c.sector} · {c.location}
                  </span>
                  <span className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold text-white">
                    {c.client}
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-accent-light" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-white/65">{c.facts[2]?.value}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <div className="h-10" />
      <Footer />
    </main>
  );
}

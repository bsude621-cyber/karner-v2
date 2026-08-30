import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/data/sectors";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/sektor";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Sektörlere Göre Web Sitesi ve Dijital Görünürlük | KARNER";
const DESCRIPTION =
  "Emlak, klinik, mimarlık, inşaat, yapı ürünleri, yerel hizmet ve butik işletmeler için web sitesi, arama görünürlüğü ve otomasyon: her sektörün aradığı şey farklı, kurulum ona göre.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Sektörler", href: PATH },
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
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      mainEntity: { "@id": `${pageUrl}#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#list`,
      name: "Sektörler",
      numberOfItems: sectors.length,
      itemListElement: sectors.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${SITE_URL}/sektor/${s.slug}`,
      })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

export default function SectorsHubPage() {
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
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">Sektörler</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Her sektörün müşterisi farklı arar; site ona göre kurulur
          </h1>
          <p className="speakable-summary mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Emlak ofisinin ihtiyacı ilan vitrini ve harita; kliniğin ihtiyacı güven ve randevu akışı;
              mimarın ihtiyacı portföy ve 3D sunum.
            </strong>{" "}
            Aşağıdaki sayfalarda her sektör için arama davranışını, sitede olması gerekenleri ve
            KARNER&apos;ın ne kurduğunu anlattık.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <ol className="grid gap-5 sm:grid-cols-2">
          {sectors.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/sektor/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/50 hover:bg-white/[0.06]"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-accent-light">{s.name}</span>
                <span className="mt-3 flex items-start justify-between gap-3 text-lg font-semibold text-white">
                  {s.title}
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-accent-light" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-white/65">{s.seoDescription}</span>
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

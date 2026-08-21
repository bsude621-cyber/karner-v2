import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/data/guides";
import { CLUSTER_LABEL, type GuideCluster } from "@/data/guides/types";
import { PILLAR_3D } from "@/data/pillar-3d";
import { PILLAR_AI_VIDEO } from "@/data/pillar-ai-video";
import { PILLAR_GEO } from "@/data/pillar-geo";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/rehber";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Rehber — Web, SEO, Yapay Zekâ Araması, Otomasyon | KARNER";
const DESCRIPTION =
  "KARNER teknik rehberleri: 3D web sitesi, yapay zekâ aramasında görünmek, llms.txt, schema.org, Core Web Vitals, n8n otomasyon, AI reklam videosu, mobil uygulama ve sosyal medya içerik takvimi. Her konunun nasıl çalıştığının sade açıklaması.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Rehber", href: PATH },
];

const pillars = [
  { ...PILLAR_3D, href: `/${PILLAR_3D.slug}`, cluster: "web" as GuideCluster },
  { ...PILLAR_GEO, href: `/${PILLAR_GEO.slug}`, cluster: "geo" as GuideCluster },
  { ...PILLAR_AI_VIDEO, href: `/${PILLAR_AI_VIDEO.slug}`, cluster: "video" as GuideCluster },
];

const clusterOrder: GuideCluster[] = ["geo", "web", "otomasyon", "video", "mobil", "sosyal"];

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
      name: "KARNER rehberleri",
      numberOfItems: pillars.length + guides.length,
      itemListElement: [
        ...pillars.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${SITE_URL}${p.href}`,
        })),
        ...guides.map((g, i) => ({
          "@type": "ListItem",
          position: pillars.length + i + 1,
          name: g.title,
          url: `${SITE_URL}/rehber/${g.slug}`,
        })),
      ],
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

export default function GuidesHubPage() {
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
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">Rehber</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Karar vermeden önce konuyu anlamak isteyenler için
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Web sitesi, yapay zekâ araması, otomasyon ve AI video hakkında teknik rehberler.
            </strong>{" "}
            Her rehber tek soruya odaklanır, kısa cevap verir, kaynağını gösterir. Satış metni değil;
            nasıl çalıştığının açıklaması.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-2xl font-semibold text-white">Ana rehberler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group rounded-2xl border border-accent/25 bg-accent/[0.06] p-6 transition hover:border-accent/60"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent-light">
                {CLUSTER_LABEL[p.cluster]}
              </span>
              <span className="mt-2 flex items-center justify-between text-lg font-semibold text-white">
                {p.title}
                <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-white/65">{p.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      {clusterOrder.map((c) => {
        const list = guides.filter((g) => g.cluster === c);
        if (!list.length) return null;
        return (
          <section key={c} id={c} className="mx-auto max-w-5xl px-6 py-8">
            <h2 className="text-xl font-semibold text-white">{CLUSTER_LABEL[c]}</h2>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2">
              {list.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/rehber/${g.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
                  >
                    <span className="flex items-start justify-between gap-3 font-medium text-white">
                      {g.title}
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-1" />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-white/60">{g.seoDescription}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      <div className="h-16" />
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { guides, getGuide } from "@/data/guides";
import { CLUSTER_LABEL } from "@/data/guides/types";
import { getService } from "@/data/services";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";
import GuideBlocks from "@/components/seo/GuideBlocks";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "KARNER" };
  return {
    title: { absolute: g.seoTitle },
    description: g.seoDescription,
    alternates: { canonical: `/rehber/${g.slug}` },
    openGraph: {
      title: g.seoTitle,
      description: g.seoDescription,
      url: `/rehber/${g.slug}`,
      type: "article",
      publishedTime: g.published,
      modifiedTime: g.modified,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const pageUrl = `${SITE_URL}/rehber/${g.slug}`;
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Rehberler", href: "/rehber" },
    { name: g.title, href: `/rehber/${g.slug}` },
  ];
  const service = getService(g.serviceSlug);
  const related = g.related.map(getGuide).filter(Boolean);
  const dates = { published: g.published, modified: g.modified };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: g.title,
        description: g.seoDescription,
        abstract: g.summary,
        url: pageUrl,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        inLanguage: "tr",
        datePublished: g.published,
        dateModified: g.modified,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        image: { "@id": `${SITE_URL}/#logo` },
        isAccessibleForFree: true,
        about: service ? { "@id": `${SITE_URL}/hizmetler/${service.slug}#service` } : undefined,
        isPartOf: {
          "@id": `${SITE_URL}${g.pillar.href}${g.pillar.href.startsWith("/hizmetler/") ? "#service" : "#article"}`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".speakable-summary"],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: g.seoTitle,
        description: g.seoDescription,
        inLanguage: "tr",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#article` },
        datePublished: g.published,
        dateModified: g.modified,
        primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
      },
      breadcrumbJsonLd(pageUrl, crumbs),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: g.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader backHref="/rehber" backLabel="Rehberler" />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Rehber · {CLUSTER_LABEL[g.cluster]}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            {g.title}
          </h1>
          <ArticleMeta dates={dates} />
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">
              Özet
            </p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{g.summary}</strong>
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <GuideBlocks blocks={g.blocks} />
        <FaqList items={g.faq} />

        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href={g.pillar.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/50 hover:bg-white/[0.06]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent-light">Ana rehber</p>
            <p className="mt-2 flex items-center justify-between font-medium text-white">
              {g.pillar.label}
              <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
            </p>
          </Link>
          {service ? (
            <Link
              href={`/hizmetler/${service.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent-light">İlgili hizmet</p>
              <p className="mt-2 flex items-center justify-between font-medium text-white">
                {service.title}
                <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
              </p>
            </Link>
          ) : null}
        </section>

        {related.length ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-white/80">İlgili rehberler</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r!.slug}>
                  <Link
                    href={`/rehber/${r!.slug}`}
                    className="block rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                  >
                    {r!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Bunu sizin siteniz için kuralım mı?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Kısa bir keşif görüşmesinde mevcut durumu birlikte bakar, ne gerektiğini yazılı söyleriz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">İletişime Geç</Link>
            <Link href="/surec" className="btn btn-secondary">Nasıl çalışıyoruz?</Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}

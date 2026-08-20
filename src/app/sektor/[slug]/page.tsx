import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { sectors, getSector } from "@/data/sectors";
import { getService } from "@/data/services";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";
import GuideBlocks from "@/components/seo/GuideBlocks";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) return { title: "KARNER" };
  return {
    title: { absolute: s.seoTitle },
    description: s.seoDescription,
    alternates: { canonical: `/sektor/${s.slug}` },
    openGraph: { title: s.seoTitle, description: s.seoDescription, url: `/sektor/${s.slug}` },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();

  const pageUrl = `${SITE_URL}/sektor/${s.slug}`;
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Sektörler", href: "/sektor" },
    { name: s.name, href: `/sektor/${s.slug}` },
  ];
  const services = s.services.map(getService).filter(Boolean);
  const others = sectors.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: s.seoTitle,
        description: s.seoDescription,
        inLanguage: "tr",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Audience", audienceType: s.name },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        datePublished: s.published,
        dateModified: s.modified,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${s.name} için web sitesi ve dijital görünürlük`,
        description: s.summary,
        url: pageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Türkiye" },
        audience: { "@type": "BusinessAudience", audienceType: s.name },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${s.name} — ilgili hizmetler`,
          itemListElement: services.map((sv) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${SITE_URL}/hizmetler/${sv!.slug}#service` },
          })),
        },
      },
      breadcrumbJsonLd(pageUrl, crumbs),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: s.faq.map((f) => ({
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
      <SubpageHeader backHref="/sektor" backLabel="Sektörler" />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Sektör · {s.name}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{s.title}</h1>
          <ArticleMeta dates={{ published: s.published, modified: s.modified }} />
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">Özet</p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{s.summary}</strong>
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <GuideBlocks blocks={s.blocks} />

        {s.demo ? (
          <section className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <video
              className="aspect-video w-full object-cover"
              poster={s.demo.poster}
              src={s.demo.video}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              aria-label={`${s.demo.title} demo sitesi önizleme`}
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-light">Demo site</p>
                <p className="mt-1 font-medium text-white">{s.demo.title}</p>
                <p className="mt-1 text-sm text-white/60">
                  Bu sektör için tasarladığımız kurgu demo — gerçek müşteri sitesi değildir.
                </p>
              </div>
              <a
                href={s.demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                Demoyu aç <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        ) : null}

        <FaqList items={s.faq} />

        {services.length ? (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-white/80">İlgili hizmetler</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((sv) => (
                <li key={sv!.slug}>
                  <Link
                    href={`/hizmetler/${sv!.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                  >
                    {sv!.title}
                    <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {s.guides.length ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-white/80">Okumanız için</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.guides.map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-accent/60 hover:text-white"
                  >
                    {href.replace(/^\/rehber\//, "").replace(/^\//, "").replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Sizin işletmeniz için konuşalım</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Mevcut durumu birlikte bakar, ne gerektiğini ve nereden başlanacağını yazılı söyleriz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">İletişime Geç</Link>
            <Link href="/paketler" className="btn btn-secondary">Paketleri gör</Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white/80">Diğer sektörler</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/sektor/${o.slug}`}
                  className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-accent/60 hover:text-white"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cases, getCase } from "@/data/cases";
import { getService } from "@/data/services";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";
import GuideBlocks from "@/components/seo/GuideBlocks";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "KARNER" };
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: `/isler/${c.slug}` },
    openGraph: {
      title: c.seoTitle,
      description: c.seoDescription,
      url: `/isler/${c.slug}`,
      type: "article",
      images: [{ url: c.image.src, width: c.image.width, height: c.image.height, alt: c.image.alt }],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const pageUrl = `${SITE_URL}/isler/${c.slug}`;
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", href: "/" },
    { name: "İşlerimiz", href: "/isler" },
    { name: c.client, href: `/isler/${c.slug}` },
  ];
  const services = c.services.map(getService).filter(Boolean);
  const others = cases.filter((x) => x.slug !== c.slug);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: c.title,
      description: c.seoDescription,
      abstract: c.summary,
      url: pageUrl,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      inLanguage: "tr",
      datePublished: c.published,
      dateModified: c.modified,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: { "@id": `${pageUrl}#image` },
      about: { "@id": `${pageUrl}#project` },
      genre: "Case study",
    },
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}#project`,
      name: `${c.client} — ${c.sector}`,
      description: c.summary,
      url: c.url,
      creator: { "@id": `${SITE_URL}/#organization` },
      locationCreated: { "@type": "Place", name: c.location },
      keywords: c.stack.join(", "),
    },
    {
      "@type": "ImageObject",
      "@id": `${pageUrl}#image`,
      url: `${SITE_URL}${c.image.src}`,
      contentUrl: `${SITE_URL}${c.image.src}`,
      width: c.image.width,
      height: c.image.height,
      caption: c.image.alt,
      creditText: "KARNER",
      copyrightHolder: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: c.seoTitle,
      description: c.seoDescription,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#article` },
      primaryImageOfPage: { "@id": `${pageUrl}#image` },
      datePublished: c.published,
      dateModified: c.modified,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  if (c.video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${pageUrl}#video`,
      name: c.video.name,
      description: c.video.description,
      thumbnailUrl: `${SITE_URL}${c.video.poster}`,
      contentUrl: `${SITE_URL}${c.video.src}`,
      uploadDate: c.video.uploadDate,
      duration: c.video.duration,
      inLanguage: "tr",
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader backHref="/isler" backLabel="İşlerimiz" />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Vaka · {c.sector}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{c.title}</h1>
          <ArticleMeta dates={{ published: c.published, modified: c.modified }} />
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">Özet</p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{c.summary}</strong>
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-6">
        {/* Kimlik şeridi */}
        <dl className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Müşteri</dt>
            <dd className="mt-1 font-medium text-white">{c.client}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Konum</dt>
            <dd className="mt-1 font-medium text-white">{c.location}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Site</dt>
            <dd className="mt-1 font-medium text-white">
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-light hover:underline"
                >
                  {c.url.replace(/^https?:\/\//, "")} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                "İç proje"
              )}
            </dd>
          </div>
        </dl>

        <figure className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          {c.video ? (
            <video
              className="w-full bg-black"
              controls
              preload="none"
              poster={c.video.poster}
              src={c.video.src}
              playsInline
            />
          ) : (
            <Image
              src={c.image.src}
              alt={c.image.alt}
              width={c.image.width}
              height={c.image.height}
              className="w-full object-cover"
            />
          )}
          <figcaption className="px-5 py-3 text-sm text-white/55">
            {c.video ? c.video.description : c.image.alt}
          </figcaption>
        </figure>

        <ol className="mt-8 grid gap-3 sm:grid-cols-3">
          {c.facts.map((f) => (
            <li key={f.label} className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-light">{f.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{f.value}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <GuideBlocks blocks={c.blocks} />
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white/80">Kullanılan yapı</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {c.disclosure ? (
          <p className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/60">
            {c.disclosure}
          </p>
        ) : null}

        <FaqList items={c.faq} />

        {services.length ? (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-white/80">Bu işte kullanılan hizmetler</h2>
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

        <section className="mt-16 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Benzer bir iş mi var?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Kısa bir görüşmede mevcut durumunuza bakar, ne gerektiğini yazılı söyleriz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">İletişime Geç</Link>
            <Link href="/surec" className="btn btn-secondary">Nasıl çalışıyoruz?</Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white/80">Diğer işler</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/isler/${o.slug}`}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                >
                  <span className="block text-xs uppercase tracking-[0.2em] text-accent-light">{o.sector}</span>
                  <span className="mt-1 block font-medium">{o.client}</span>
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

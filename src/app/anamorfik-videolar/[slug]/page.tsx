import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  anamorphicProjects,
  getAnamorphicProject,
  CONCEPT_DISCLAIMER,
} from "@/data/anamorphic";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { SITE_URL, breadcrumbJsonLd, isoWithTz, type Crumb } from "@/lib/site";

/**
 * Anamorfik video projesi sayfası — ana sayfadaki "Anamorfik videolarımız"
 * kartına tıklayınca açılır. Projenin tüm videoları oynatıcı kontrolleriyle
 * listelenir; ziyaretçi istediğini açıp izler (tam ekran dâhil).
 */
export function generateStaticParams() {
  return anamorphicProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getAnamorphicProject(slug);
  if (!p) return { title: "KARNER" };
  const first = p.videos[0];
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDescription,
    alternates: { canonical: `/anamorfik-videolar/${p.slug}` },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDescription,
      url: `/anamorfik-videolar/${p.slug}`,
      type: "video.other",
      images: [{ url: first.poster, alt: `${p.title} — ${first.title}` }],
    },
  };
}

export default async function AnamorphicProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getAnamorphicProject(slug);
  if (!p) notFound();

  const pageUrl = `${SITE_URL}/anamorfik-videolar/${p.slug}`;
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Anamorfik videolarımız", href: "/#anamorfik" },
    { name: p.title, href: `/anamorfik-videolar/${p.slug}` },
  ];
  const others = anamorphicProjects.filter((x) => x.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: p.seoTitle,
        description: p.seoDescription,
        inLanguage: "tr",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        datePublished: p.published,
        dateModified: p.modified,
      },
      breadcrumbJsonLd(pageUrl, crumbs),
      ...p.videos.map((v, i) => ({
        "@type": "VideoObject",
        "@id": `${pageUrl}#video-${i + 1}`,
        name: `${p.title} — ${v.title}`,
        description: v.description,
        thumbnailUrl: `${SITE_URL}${v.poster}`,
        contentUrl: `${SITE_URL}${v.src}`,
        uploadDate: isoWithTz(v.uploadDate),
        duration: v.duration,
        inLanguage: "tr",
        creator: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      })),
    ],
  };

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader backHref="/#anamorfik" backLabel="Anamorfik videolarımız" />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-5xl px-6 pb-6 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Anamorfik LED · Konsept
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{p.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{p.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-6">
        {/* Videolar: kontroller açık, kullanıcı başlatır. preload="none":
            sayfa açılınca yalnızca poster iner, video oynatılınca. */}
        <section aria-label="Videolar">
          <ul className={p.videos.length > 1 ? "grid gap-6 md:grid-cols-2" : "grid gap-6"}>
            {p.videos.map((v) => (
              <li
                key={v.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <video
                  // Sabit oran yok: videolar farklı oranlarda (16:9, 3:2). Kutu,
                  // kapak görselinin (sonra videonun) kendi oranını alır —
                  // yanlarda siyah bant kalmaz.
                  className="block h-auto w-full bg-black"
                  controls
                  playsInline
                  preload="none"
                  poster={v.poster}
                  src={v.src}
                  aria-label={`${p.title} — ${v.title}`}
                />
                <div className="px-5 py-4">
                  <h2 className="text-base font-semibold text-white">{v.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{v.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <article className="mt-12 max-w-3xl space-y-4 leading-relaxed text-white/75">
          <h2 className="text-2xl font-semibold text-white">Film nasıl ilerliyor?</h2>
          {p.story.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </article>

        <p className="mt-8 max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/60">
          {CONCEPT_DISCLAIMER}
        </p>

        <section className="mt-12 grid gap-3 sm:grid-cols-2">
          <Link
            href="/hizmetler/3d-anamorfik-led-video"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
          >
            3D Anamorfik LED Video hizmetimiz
            <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
          </Link>
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/anamorfik-videolar/${o.slug}`}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
            >
              {o.title}
              <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Ekranınız için bir video mu düşünüyorsunuz?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Ekranın ölçüsünü ve izleyicinin durduğu noktayı söyleyin; sahneyi o ekran için kuralım.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">İletişime Geç</Link>
            <Link href="/#anamorfik" className="btn btn-secondary">Diğer videolar</Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

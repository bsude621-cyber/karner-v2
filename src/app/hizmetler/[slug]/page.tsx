import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { services, getService } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "KARNER" };
  const title = service.seoTitle ?? `${service.title} — KARNER`;
  const description = service.seoDescription ?? service.summary;
  return {
    // seoTitle marka ekini içerir; layout template'inin tekrar eklememesi için absolute.
    title: { absolute: title },
    description,
    alternates: { canonical: `/hizmetler/${slug}` },
    openGraph: {
      title,
      description,
      url: `/hizmetler/${slug}`,
    },
  };
}

/** Service + BreadcrumbList + FAQPage — layout'taki Organization/WebSite @id'lerine bağlanır. */
function serviceJsonLd(service: NonNullable<ReturnType<typeof getService>>) {
  const pageUrl = `${SITE_URL}/hizmetler/${service.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.title,
      description: service.summary,
      url: pageUrl,
      serviceType: service.title,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Türkiye" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Hizmetler",
          item: `${SITE_URL}/#hizmetler`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (service.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: service.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />

      {/* Üst bar */}
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
          href="/#hizmetler"
          className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Hizmetler
        </Link>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.imageSrc}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/85 to-accent-2/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-36">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {service.no} — {service.tag}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {service.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">Neler sunuyoruz?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {service.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {service.proof ? (
          <div className="mt-10 rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 to-accent-2/10 p-7">
            <p className="text-sm font-medium uppercase tracking-wider text-accent-light">
              Referans
            </p>
            <p className="mt-3 text-lg leading-relaxed text-white/85">
              {service.proof}
            </p>
          </div>
        ) : null}

        {/* SSS — FAQPage schema ile birebir aynı içerik */}
        {service.faq?.length ? (
          <div className="mt-14">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Sık sorulan sorular
            </h2>
            <div className="mt-6 space-y-4">
              {service.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40"
                >
                  <summary className="cursor-pointer list-none px-6 py-5 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-white/70">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Bu hizmet ilginizi çekti mi?</h3>
            <p className="mt-1 text-white/60">
              Projenizi konuşalım — birkaç saat içinde dönüş yapıyoruz.
            </p>
          </div>
          <Link
            href="/#iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-medium text-white transition hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(123,63,228,0.6)]"
          >
            Teklif Al
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Diğer hizmetler */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-xl font-semibold text-white/80">Diğer hizmetler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/hizmetler/${o.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
            >
              <span className="text-xs uppercase tracking-wider text-accent-light">
                {o.tag}
              </span>
              <p className="mt-2 flex items-center justify-between font-medium text-white">
                {o.title}
                <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-12 text-center text-white/60">
        © 2026 KARNER. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}

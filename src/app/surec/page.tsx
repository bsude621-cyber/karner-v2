import type { Metadata } from "next";
import Link from "next/link";
import { PROCESS_STEPS } from "@/data/process";
import { pageDates } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import FaqList from "@/components/seo/FaqList";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/surec";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Nasıl Çalışıyoruz? Web Sitesi ve SEO Süreci 4 Adımda | KARNER";
const DESCRIPTION =
  "KARNER'da bir proje nasıl ilerler: keşif, tasarım, kurulum, ölçüm. Her adımın çıktısı, ne zaman onay alındığı ve teslim sonrası neyin devam ettiği — süre ve fiyat vaadi değil, iş akışı.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Süreç", href: PATH },
];

const FAQ = [
  {
    q: "Süreç boyunca ne zaman onay veriyorum?",
    a: "Üç noktada: keşif sonunda yazılı kapsamda, tasarımda ilk açılış ekranı (hero) gösterildiğinde ve yayın öncesi son kontrolde. Her onay noktasında neyi onayladığınız yazılı olur; onaylanmamış bir yön üzerinde üretime devam edilmez.",
  },
  {
    q: "İçeriği kim yazıyor?",
    a: "Çerçeveyi ve taslağı biz hazırlarız; işletmeye özgü bilgiler (hizmet kapsamı, bölge, ekip, yetki belgeleri) sizden gelir ve sizin onayınızla yayınlanır. Doğrulanmamış sayı, sertifika veya müşteri yorumu yazmayız; onaylanmamış bilgi yayınlanmaz.",
  },
  {
    q: "Teslimden sonra ne olur?",
    a: "Yayın sonrası ölçüm başlar: arama kayıtları açılır, hedef sorgular klasik arama ve yapay zekâ araçlarında birlikte izlenir. Bakım kapsamı varsa içerik güncellemeleri ve aylık özet devam eder; yoksa site ve alan adı erişimleri sizde kalır, istediğinizde tekrar başlanır.",
  },
  {
    q: "Mevcut sitemi koruyarak ilerleyebilir miyiz?",
    a: "Evet. Keşifte mevcut siteyi hız, yapısal veri ve içerik açısından inceleriz; sorun altyapıdaysa yeniden kurulum, içerik ve sinyal eksiğiyse mevcut sitede iyileştirme öneririz. Karar keşif bulgusuna göre birlikte verilir.",
  },
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
      mainEntity: { "@id": `${pageUrl}#howto` },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
    },
    {
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: "KARNER ile web sitesi ve arama görünürlüğü projesi nasıl ilerler?",
      description: DESCRIPTION,
      inLanguage: "tr",
      step: PROCESS_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${pageUrl}#adim-${s.no}`,
        itemListElement: s.detail.map((d) => ({ "@type": "HowToDirection", text: d })),
      })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ProcessPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">Süreç</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Web sitesi ve SEO süreci nasıl işler?
          </h1>
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">
                Dört adım: keşif, tasarım, kurulum, ölçüm. Her adımın yazılı bir çıktısı ve bir onay noktası var;
                arama görünürlüğü sonradan eklenen paket değil, kurulumun parçası.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-8">
        <ol className="space-y-6">
          {PROCESS_STEPS.map((s) => (
            <li
              key={s.no}
              id={`adim-${s.no}`}
              className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-bold text-accent-light">{s.no}</span>
                <h2 className="text-2xl font-semibold text-white">{s.name}</h2>
                <span className="ml-auto rounded-full border border-accent/30 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-light">
                  {s.output}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-white/70">{s.text}</p>
              <ul className="mt-4 space-y-2">
                {s.detail.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-white/65">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <FaqList items={FAQ} />

        <section className="mt-16 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Keşifle başlayalım</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Kısa bir görüşme, yazılı kapsam, sonra karar sizin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">İletişime Geç</Link>
            <Link href="/paketler" className="btn btn-secondary">Paketler</Link>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

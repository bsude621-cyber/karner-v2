import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { PILLAR_GEO, PILLAR_GEO_FAQ } from "@/data/pillar-geo";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";
import { pageDates } from "@/data/dates";
import { guidesByCluster } from "@/data/guides";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";

export const metadata: Metadata = {
  title: { absolute: PILLAR_GEO.seoTitle },
  description: PILLAR_GEO.seoDescription,
  alternates: { canonical: `/${PILLAR_GEO.slug}` },
  openGraph: {
    title: PILLAR_GEO.seoTitle,
    description: PILLAR_GEO.seoDescription,
    url: `/${PILLAR_GEO.slug}`,
  },
};

const pageUrl = `${SITE_URL}/${PILLAR_GEO.slug}`;
const dates = pageDates(`/${PILLAR_GEO.slug}`);
const spokes = guidesByCluster("geo");
const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Rehberler", href: "/rehber" },
  { name: PILLAR_GEO.title, href: `/${PILLAR_GEO.slug}` },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${pageUrl}#article`,
      headline: PILLAR_GEO.title,
      description: PILLAR_GEO.seoDescription,
      abstract: PILLAR_GEO.summary,
      url: pageUrl,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      inLanguage: "tr",
      datePublished: dates.published,
      dateModified: dates.modified,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: { "@id": `${SITE_URL}/#logo` },
      isAccessibleForFree: true,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: PILLAR_GEO.seoTitle,
      description: PILLAR_GEO.seoDescription,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      datePublished: dates.published,
      dateModified: dates.modified,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#article` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
      about: { "@id": `${SITE_URL}/hizmetler/seo-geo-aeo#service` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: PILLAR_GEO_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const comparison = [
  {
    k: "Hedef",
    seo: "Google/Bing sonuç listesinde üst sıra",
    geo: "AI cevabında kaynak gösterilmek / önerilmek",
    aeo: "Öne çıkan snippet, sesli arama, soru kutuları",
  },
  {
    k: "Ödüllendirdiği içerik",
    seo: "Konu bütünlüğü, teknik sağlamlık, otorite",
    geo: "Net, alıntılanabilir, kaynaklı ve güncel bilgi",
    aeo: "Soruya 40-60 kelimede doğrudan cevap",
  },
  {
    k: "Ölçümü",
    seo: "Sıralama ve tıklama raporları",
    geo: "AI araçlarına düzenli sorgu testleri",
    aeo: "Snippet ve soru kutusu görünümleri",
  },
];

const reasons = [
  {
    t: "AI botları siteye erişemiyor",
    d: "robots.txt'te GPTBot, ClaudeBot, PerplexityBot gibi botlar engellenmişse — ya da hiç düşünülmemişse — yapay zekâ araçları siteyi hiç okuyamaz. Görünmeyen site önerilemez.",
  },
  {
    t: "İçerik JavaScript'e gömülü",
    d: "AI botlarının çoğu, tarayıcı gibi JavaScript çalıştırmaz; yalnızca sunucudan gelen HTML'i okur. İçeriği sonradan yüklenen sitelerde botlar boş sayfa görür.",
  },
  {
    t: "Yapısal veri yok",
    d: "Schema.org işaretlemesi; firmanın kim olduğunu, ne yaptığını ve nerede hizmet verdiğini makinelere kesin dille anlatır. Bu katman yoksa araçlar siteyi tahminle sınıflar.",
  },
  {
    t: "İçerik alıntılanabilir değil",
    d: "Yapay zekâ, cevabına taşıyabileceği net cümleler arar: tanımlar, listeler, somut bilgiler. Pazarlama sloganlarıyla dolu bir sayfadan alıntılanacak cümle çıkmaz.",
  },
  {
    t: "İşletme kimliği tutarsız veya doğrulanamıyor",
    d: "Sektörünüzde resmi yetki listesi, oda kaydı veya katalog varsa ve firma orada görünmüyorsa — ya da sitedeki bilgilerle çelişiyorsa — araçlar daha doğrulanabilir rakibi önerir.",
  },
];

export default function PillarGeoPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Ana Sayfa
        </Link>
      </header>

      {/* Başlık */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Rehber
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            ChatGPT&apos;de Çıkmak: Firmanız Yapay Zekâ Aramasında Nasıl
            Görünür?
          </h1>
          <ArticleMeta dates={dates} />

          {/* TL;DR — speakable */}
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">
              Özet
            </p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{PILLAR_GEO.summary}</strong> Bu
              rehberde yapay zekâ aramasının nasıl çalıştığını, araçların
              hangi siteleri kaynak seçtiğini ve görünürlüğün adım adım nasıl
              kurulduğunu anlatıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Yapay zekâ araması nedir, klasik aramadan farkı ne?
          </h2>
          <dl className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <dt className="font-semibold text-white">
              GEO (Generatif Arama Optimizasyonu)
            </dt>
            <dd className="mt-2 leading-relaxed text-white/70">
              ChatGPT, Gemini ve Perplexity gibi yapay zekâ araçlarının bir
              soruya cevap üretirken sizin sitenizi kaynak göstermesini ve
              firmanızı önermesini sağlama çalışmasıdır.
            </dd>
          </dl>
          <p className="leading-relaxed text-white/70">
            Klasik aramada kullanıcı bir liste görür ve seçimi kendisi yapar.
            Yapay zekâ aramasında ise araç; soruyu arama sorgularına çevirir,
            web'den sayfalar çeker, içlerinden{" "}
            <strong className="text-white">
              alıntılamaya değer bulduklarını seçer
            </strong>{" "}
            ve tek bir cevap yazar. Kullanıcı listeyi değil, cevabı görür.
            Cevapta adı geçmeyen firma, o kullanıcı için hiç var olmamıştır —
            klasik aramadaki &ldquo;3. sayfada da olsa varım&rdquo; durumu
            burada yoktur.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            Bu yüzden yapay zekâ görünürlüğü ayrı bir disiplindir:{" "}
            <strong className="text-white">
              sıralama savaşı değil, kaynak seçilme savaşıdır.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            SEO, GEO ve AEO arasındaki fark ne?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="px-5 py-4 font-semibold text-white"> </th>
                  <th className="px-5 py-4 font-semibold text-white/80">SEO</th>
                  <th className="px-5 py-4 font-semibold text-accent-light">
                    GEO
                  </th>
                  <th className="px-5 py-4 font-semibold text-white/80">AEO</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.k} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 font-medium text-white">{row.k}</td>
                    <td className="px-5 py-4 text-white/60">{row.seo}</td>
                    <td className="px-5 py-4 text-white/80">{row.geo}</td>
                    <td className="px-5 py-4 text-white/60">{row.aeo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 leading-relaxed text-white/70">
            Üç katman birbirinin yerine geçmez;{" "}
            <strong className="text-white">
              aynı sitenin üç farklı arama yüzeyinde görünmesini sağlar.
            </strong>{" "}
            İyi kurulmuş bir site üçünü aynı altyapıdan besler: teknik temel
            SEO'yu, yapısal veri ve alıntılanabilir içerik GEO'yu, soru-cevap
            formatı AEO'yu taşır.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Firmam ChatGPT&apos;de çıkmıyor — neden?
          </h2>
          <p className="mb-6 leading-relaxed text-white/70">
            En sık karşılaşılan beş sebep:
          </p>
          <div className="space-y-4">
            {reasons.map((r, i) => (
              <div
                key={r.t}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold text-white">
                  <span className="mr-2 text-accent-light">{i + 1}.</span>
                  {r.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {r.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Görünürlük nasıl kurulur?
          </h2>
          <ol className="space-y-5">
            {[
              {
                t: "1. Bot erişimi açılır",
                d: "robots.txt'te yapay zekâ botlarının tamamına açık izin verilir; llms.txt ve llms-full.txt ile site, araçlara kendi diliyle tanıtılır.",
              },
              {
                t: "2. Yapısal veri kurulur",
                d: "Organization, Service, FAQPage gibi schema.org düğümleri birbirine bağlı tek bir grafik hâlinde kurulur. Araçlar firmanın kim olduğunu tahmin etmez, okur.",
              },
              {
                t: "3. İçerik cevap formatına getirilir",
                d: "Sayfalara tanım kutuları, soru biçiminde başlıklar ve net özetler eklenir. Amaç, yapay zekânın cevabına taşıyabileceği cümleler sunmaktır — pazarlama yağı değil.",
              },
              {
                t: "4. Kimlik tutarlılığı sağlanır",
                d: "Sitedeki işletme bilgileri; varsa resmi yetki kayıtları, oda üyelikleri ve sektör kataloglarıyla birebir tutarlı hâle getirilir. Doğrulanabilir firma, önerilebilir firmadır.",
              },
              {
                t: "5. Sorgu testleriyle ölçülür",
                d: "Hedef sorular ('X hizmeti için hangi firma?' gibi) ChatGPT, Gemini ve Perplexity'ye düzenli aralıklarla sorulur; firmanın görünüp görünmediği kayıt altına alınır ve strateji sonuca göre ayarlanır.",
              },
            ].map((step) => (
              <li
                key={step.t}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold text-accent-light">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 leading-relaxed text-white/70">
            Bu yaklaşımın kanıtı sahada: AYSA Endüstriyel Temizlik için
            &ldquo;muğla baca temizliği&rdquo; aramasında üç yüzeyde birden
            görünürlük sağladık — ChatGPT firmayı öneriyor, Google AI Bakışı
            tercih edilen firmalar arasında gösteriyor ve organik sonuçlarda
            2. sıradayız.
          </p>
        </section>

        {/* SSS */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Sık sorulan sorular
          </h2>
          <div className="space-y-4">
            {PILLAR_GEO_FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40"
              >
                <summary className="cursor-pointer list-none px-6 py-5 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Bu konudaki rehberler</h2>
          <p className="mb-6 text-white/65">Ana rehberin açtığı soruları tek tek ele alan kısa rehberler.</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {spokes.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/rehber/${g.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
                >
                  <span className="font-medium text-white">{g.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-white/60">{g.seoDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Firmanız yapay zekâ aramasında görünsün
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Sektörünüzü ve hedef sorgularınızı anlatın; görünürlüğün sizin
            durumunuzda nasıl kurulacağını somut adımlarla çıkaralım.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#iletisim" className="btn btn-primary">
              Teklif Al
            </Link>
            <Link
              href="/hizmetler/seo-geo-aeo"
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              SEO / GEO / AEO Hizmeti
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

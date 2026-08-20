import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { PILLAR_AI_VIDEO, PILLAR_AI_VIDEO_FAQ } from "@/data/pillar-ai-video";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";
import { pageDates } from "@/data/dates";
import { guidesByCluster } from "@/data/guides";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";

export const metadata: Metadata = {
  title: { absolute: PILLAR_AI_VIDEO.seoTitle },
  description: PILLAR_AI_VIDEO.seoDescription,
  alternates: { canonical: `/${PILLAR_AI_VIDEO.slug}` },
  openGraph: {
    title: PILLAR_AI_VIDEO.seoTitle,
    description: PILLAR_AI_VIDEO.seoDescription,
    url: `/${PILLAR_AI_VIDEO.slug}`,
  },
};

const pageUrl = `${SITE_URL}/${PILLAR_AI_VIDEO.slug}`;
const dates = pageDates(`/${PILLAR_AI_VIDEO.slug}`);
const spokes = guidesByCluster("video");
const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Rehberler", href: "/rehber" },
  { name: PILLAR_AI_VIDEO.title, href: `/${PILLAR_AI_VIDEO.slug}` },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${pageUrl}#article`,
      headline: PILLAR_AI_VIDEO.title,
      description: PILLAR_AI_VIDEO.seoDescription,
      abstract: PILLAR_AI_VIDEO.summary,
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
      name: PILLAR_AI_VIDEO.seoTitle,
      description: PILLAR_AI_VIDEO.seoDescription,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      datePublished: dates.published,
      dateModified: dates.modified,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#article` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
      about: { "@id": `${SITE_URL}/hizmetler/ai-video-reklam#service` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: PILLAR_AI_VIDEO_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const comparison = [
  {
    k: "Hazırlık",
    klasik: "Mekân, ekip, oyuncu, ekipman planlaması",
    ai: "Brief, senaryo ve marka varlıkları yeterli",
  },
  {
    k: "Maliyet kalemleri",
    klasik: "Çekim günü, ekip, mekân kirası, oyuncu, kurgu",
    ai: "Senaryo, üretim ve kurgu — çekim lojistiği yok",
  },
  {
    k: "Revizyon",
    klasik: "Yeniden çekim gerektirebilir",
    ai: "İlgili sahne yeniden üretilir",
  },
  {
    k: "Güncelleme",
    klasik: "Kampanya değişince video eskir",
    ai: "Metin/sahne katmanı güncellenir, video yaşar",
  },
  {
    k: "En güçlü olduğu yer",
    klasik: "Oyunculu hikâye, birebir mekân, belgesel",
    ai: "Ürün tanıtımı, konsept film, sosyal medya serisi",
  },
];

const useCases = [
  {
    t: "Ürün ve hizmet tanıtımı",
    d: "Ürünün gerçek görseli sahneye yerleştirilir; yapay zekâ etrafındaki sinematik dünyayı kurar. E-ticaret ve yerel hizmet işletmeleri için en hızlı dönüş alınan format.",
  },
  {
    t: "Sosyal medya serileri",
    d: "Reels, TikTok ve Shorts için düzenli içerik akışı. Aynı görsel dille haftalık seri üretmek, tek seferlik reklamdan daha kalıcı takipçi etkisi bırakır.",
  },
  {
    t: "Konsept ve marka filmi",
    d: "Gerçek çekimle pahalı veya imkânsız sahneler — mevsim değişimi, kuş bakışı şehir, hayali mekân — yapay zekâyla üretilebilir hâle gelir.",
  },
  {
    t: "Kampanya ve sezon duyuruları",
    d: "İndirim, açılış, bayram gibi tarihli içerikler kısa sürede hazırlanır; kampanya bitince aynı şablon bir sonrakine uyarlanır.",
  },
];

export default function PillarAiVideoPage() {
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
            Yapay Zekâ ile Reklam Videosu: Fikirden Yayına Modern Üretim
          </h1>
          <ArticleMeta dates={dates} />

          {/* TL;DR — speakable */}
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">
              Özet
            </p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{PILLAR_AI_VIDEO.summary}</strong>{" "}
              Bu rehberde AI reklam videosunun ne olduğunu, klasik
              prodüksiyondan farkını, hangi içeriklerde işe yaradığını ve
              üretim sürecinin adımlarını anlatıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Yapay zekâ reklam videosu nedir?
          </h2>
          <dl className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <dt className="font-semibold text-white">Yapay zekâ reklam videosu</dt>
            <dd className="mt-2 leading-relaxed text-white/70">
              Görüntüleri Veo ve Kling gibi yapay zekâ video modelleriyle
              üretilen, senaryosu ve marka dili insan elinden çıkan reklam
              içeriğidir. Kamera yerine metin ve görsel yönlendirmeyle
              çalışılır; sahneler modele tarif edilir, model görüntüyü üretir.
            </dd>
          </dl>
          <p className="leading-relaxed text-white/70">
            Burada kritik nokta iş bölümüdür:{" "}
            <strong className="text-white">
              Yapay zekâ görüntüyü üretir; fikri, senaryoyu ve marka dilini
              insan kurar.
            </strong>{" "}
            İyi bir AI reklam videosunu vasatından ayıran şey model değil,
            modelin önüne konan senaryo, görsel yönetim ve kurgudur. Bu
            yüzden süreç bir &ldquo;butona basma&rdquo; işi değil, klasik
            reklamcılığın yaratıcı disipliniyle yeni üretim araçlarının
            birleşimidir.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Klasik prodüksiyondan farkı ne?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="px-5 py-4 font-semibold text-white"> </th>
                  <th className="px-5 py-4 font-semibold text-white/80">
                    Klasik prodüksiyon
                  </th>
                  <th className="px-5 py-4 font-semibold text-accent-light">
                    AI üretim
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.k} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 font-medium text-white">{row.k}</td>
                    <td className="px-5 py-4 text-white/60">{row.klasik}</td>
                    <td className="px-5 py-4 text-white/80">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 leading-relaxed text-white/70">
            <strong className="text-white">
              AI üretim, klasik prodüksiyonun rakibi değil tamamlayıcısıdır.
            </strong>{" "}
            Oyunculu uzun anlatımlarda ve birebir mekân çekimlerinde gerçek
            prodüksiyon hâlâ gereklidir; ürün tanıtımı, konsept anlatımı ve
            sosyal medya içeriğinde ise AI üretim hız ve esneklikle öne
            geçer. Doğru araç, içeriğin türüne göre seçilir — biz her iki
            durumda da dürüst yönlendirme yaparız.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Hangi içerik türlerinde işe yarar?
          </h2>
          <div className="space-y-4">
            {useCases.map((u) => (
              <div
                key={u.t}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold text-white">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {u.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Üretim süreci nasıl işler?
          </h2>
          <ol className="space-y-5">
            {[
              {
                t: "1. Brief ve hedef",
                d: "Videonun tek işi ne? Satış, tanıtım, takipçi, başvuru — hedef netleşmeden senaryo yazılmaz. Hedef kitle ve yayınlanacağı platformlar da burada belirlenir.",
              },
              {
                t: "2. Senaryo ve storyboard",
                d: "Saniye saniye akış: açılış kancası, mesaj, kanıt, çağrı. Sosyal medyada ilk 2-3 saniye izlenmeyi belirlediği için kanca ayrı çalışılır.",
              },
              {
                t: "3. Görsel dil ve varlıklar",
                d: "Marka renkleri, tipografi, ürün görselleri ve varsa logo animasyonu üretime girer. Görsel tutarlılık için sahnelerin ortak stili baştan tanımlanır.",
              },
              {
                t: "4. Video üretimi",
                d: "Sahneler yapay zekâ modelleriyle üretilir; her sahne için en iyi sonuç seçilene kadar varyasyon alınır. Uncanny valley etkisi veren (yapay duran) kareler elenir.",
              },
              {
                t: "5. Kurgu, ses ve teslim",
                d: "Sahneler kurgulanır; seslendirme, müzik, altyazı ve marka kapanışı eklenir. Video, her platformun formatına ayrı ayrı çıkarılır ve yayına hazır teslim edilir.",
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
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Maliyet neye göre değişir?
          </h2>
          <p className="leading-relaxed text-white/70">
            AI reklam videosunda maliyeti belirleyen değişkenler:{" "}
            <strong className="text-white">video süresi ve sahne sayısı</strong>,{" "}
            <strong className="text-white">format sayısı</strong> (tek platform
            mu, dikey + yatay + kare set mi),{" "}
            <strong className="text-white">seslendirme tercihi</strong> (AI
            seslendirme veya sanatçı) ve{" "}
            <strong className="text-white">marka varlıklarının hazırlığı</strong>{" "}
            (logo, ürün görseli, renk kılavuzu hazırsa süreç kısalır).
            Kampanya hedefinizi dinledikten sonra bu değişkenlere göre net
            kapsam ve teklif çıkarırız.
          </p>
        </section>

        {/* SSS */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Sık sorulan sorular
          </h2>
          <div className="space-y-4">
            {PILLAR_AI_VIDEO_FAQ.map((f) => (
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
            Markanız için ilk AI reklam videosunu konuşalım
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Hedefinizi anlatın; hangi formatın ve üretim yolunun size uyduğunu
            dürüstçe söyleyelim.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#iletisim" className="btn btn-primary">
              Teklif Al
            </Link>
            <Link
              href="/hizmetler/ai-video-reklam"
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              AI Video &amp; Reklam Hizmeti
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

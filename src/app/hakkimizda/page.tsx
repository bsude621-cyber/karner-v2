import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { PROCESS_STEPS } from "@/data/process";
import Footer from "@/components/Footer";
import { SITE_URL, TEAM_ROLES, breadcrumbJsonLd, type Crumb } from "@/lib/site";
import { pageDates } from "@/data/dates";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Hakkımızda — KARNER Yazılım ve Medya" },
  description:
    "KARNER; Türkiye'nin tamamına hizmet veren bir yazılım ve medya şirketidir. Web sitesi, mobil uygulama, AI video, SEO/GEO/AEO, otomasyon ve marka tasarımı.",
  alternates: { canonical: "/hakkimizda" },
};

const PATH = "/hakkimizda";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: PATH },
];

/**
 * SEO: AboutPage + BreadcrumbList. Organization düğümü layout'taki kök
 * graph'ta tanımlı; burada @id ile referans verilir. Kişi (Person) düğümü
 * bilinçli olarak YOK — ekip isimsiz anlatılır (2026-08-21).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${pageUrl}#aboutpage`,
      name: "Hakkımızda — KARNER",
      url: pageUrl,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

/** Çalışma ilkeleri — hepsi site genelindeki gerçek uygulamalara dayanır. */
const PRINCIPLES = [
  {
    title: "Kapsam yazılı, fiyat yazılı",
    text: "Her işte neyin dâhil, neyin hariç olduğu baştan yazılır; fiyat keşif görüşmesinden sonra yazılı teklifle verilir.",
  },
  {
    title: "Varlıklar sizin adınıza",
    text: "Domain, hosting ve hesaplar talep hâlinde sizin adınıza açılır; erişimler teslimde devredilir.",
  },
  {
    title: "Sonuç tarihli ve ölçülür",
    text: "Görünürlük gözlemleri tarihiyle ve ekran görüntüsüyle raporlanır; sıralama garantisi verilmez.",
  },
  {
    title: "Gerçek görsel, gerçek içerik",
    text: "Stok fotoğraf ve şablon metin yerine işletmenin kendi görseli ve kendi dili kullanılır.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="h-16" aria-hidden />

      {/* Başlık + özet */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-3xl px-6 pb-8 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
            Hakkımızda
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Yazılım ve medyayı aynı çatıda birleştiren dijital stüdyo
          </h1>
          <p className="speakable-summary mt-6 text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              KARNER; Türkiye&apos;nin tamamına hizmet veren bir yazılım ve
              medya şirketidir.
            </strong>{" "}
            Web sitesi, mobil uygulama, yapay zekâ destekli video ve görsel
            üretimi, arama görünürlüğü (SEO/GEO/AEO), iş akışı otomasyonu,
            marka tasarımı ve sosyal medya içeriğini tek çatı altında sunar.
            Amacımız, işletmeleri yalnızca Google&apos;da değil, ChatGPT ve
            Gemini gibi yapay zekâ aramalarında da görünür kılmaktır.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">KARNER kimdir?</h2>
          <p className="leading-relaxed text-white/70">
            KARNER, yazılım mühendisliği ile medya üretimini aynı ekipte
            toplayan bir dijital stüdyodur. Kod yazan tarafımız modern web ve
            mobil teknolojileriyle üretir; medya tarafımız yapay zekâ destekli
            video, görsel ve marka diliyle bu üretimi görünür kılar. İki
            disiplini ayrı ajanslara bölmek yerine tek çatıda birleştirdiğimiz
            için strateji, üretim ve yayın aynı elden, tutarlı ilerler.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Ekip</h2>
          <p className="mb-6 leading-relaxed text-white/70">
            İşler kişiye göre değil, sorumluluk alanına göre yürütülür; her
            projede aşağıdaki üç alan birlikte çalışır:
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {TEAM_ROLES.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-medium text-white">{r.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{r.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Ne yapıyoruz?</h2>
          <p className="mb-6 leading-relaxed text-white/70">
            Yerel işletmelerden dijital ürün fikirlerine kadar farklı
            ölçeklerde çalışıyoruz. Sekiz hizmet alanımız:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                >
                  {s.title}
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-accent-light" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Nasıl çalışıyoruz?</h2>
          <p className="leading-relaxed text-white/70">
            Her proje aynı dört adımdan geçer; her adımın çıktısı yazılıdır.
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {PROCESS_STEPS.map((st) => (
              <li
                key={st.no}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-accent-light">
                  {st.no}
                </p>
                <p className="mt-1 font-medium text-white">{st.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Çıktı: {st.output}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/surec"
            className="group mt-5 inline-flex items-center gap-2 text-sm text-accent-light transition hover:text-white"
          >
            Sürecin tamamı
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <p className="mt-8 leading-relaxed text-white/70">
            Modern ve kanıtlanmış bir teknoloji yığınıyla üretiyoruz: web&apos;de
            Next.js ve Three.js, mobilde Expo, arka planda Supabase, otomasyonda
            n8n ve dil modeli API&apos;leri, medya üretiminde Veo, Kling ve
            Adobe Firefly. Tekrarlayan işleri otomasyona devrettiğimiz için
            zamanımız tasarıma, stratejiye ve kaliteye kalır.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Çalışma ilkelerimiz</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-medium text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Bizi farklı kılan ne?</h2>
          <p className="leading-relaxed text-white/70">
            Sitenin <strong className="text-white">bulunmasını</strong> işin
            merkezine koyarız. Yapay zekâ aramalarının klasik aramanın yanına
            yerleştiği bir dönemde; içerik, yapısal veri ve teknik SEO&apos;yu üç
            arama yüzeyi için birden kurarız — Google, cevap motorları ve
            ChatGPT/Gemini gibi üretken arama araçları.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            Bu yaklaşımın saha uygulamaları tarihli gözlemlerle{" "}
            <Link href="/isler" className="text-accent-light underline-offset-4 hover:underline">
              İşlerimiz
            </Link>{" "}
            sayfasında; arama sonuçları değiştiği için gözlemler vaat olarak
            değil, ölçüm olarak sunulur.
          </p>
        </section>

        {/* İletişim CTA */}
        <section className="rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Birlikte çalışalım</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Projenizi konuşmak için bize ulaşın — telefon, e-posta veya site
            üzerinden.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/iletisim" className="btn btn-primary">
              İletişime Geç
            </Link>
            <a href="tel:+905442188645" className="btn btn-secondary">
              0544 218 8645
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import Footer from "@/components/Footer";
import {
  PEOPLE,
  SITE_URL,
  breadcrumbJsonLd,
  personId,
  type Crumb,
} from "@/lib/site";
import { pageDates } from "@/data/dates";
import Breadcrumb from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Hakkımızda — KARNER Yazılım ve Medya" },
  description:
    "KARNER; Muğla ve Ankara'dan Türkiye'nin tamamına hizmet veren bir yazılım ve medya şirketidir. Web sitesi, mobil uygulama, AI video, SEO/GEO/AEO, otomasyon ve marka tasarımı.",
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
 * SEO: AboutPage + BreadcrumbList. Organization ve kurucu Person düğümleri
 * layout'taki kök graph'ta tanımlı; burada @id ile referans verilir
 * (çift tanım = çelişki riski).
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
      mentions: PEOPLE.map((p) => ({ "@id": personId(p.id) })),
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

const team = [
  ...PEOPLE.map((p) => ({ id: p.id, name: p.name, role: p.jobTitle })),
  { id: "ahmet", name: "Ahmet", role: "Teknik Danışman" },
];

export default function AboutPage() {
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
              KARNER; Muğla ve Ankara&apos;dan Türkiye&apos;nin tamamına hizmet
              veren bir yazılım ve medya şirketidir.
            </strong>{" "}
            Web sitesi, mobil uygulama, yapay zekâ destekli video ve görsel
            üretimi, SEO/GEO/AEO, iş akışı otomasyonu ve marka tasarımını tek
            çatı altında sunuyoruz. Amacımız; işletmeleri yalnızca Google'da
            değil, ChatGPT ve Gemini gibi yapay zekâ aramalarında da görünür
            kılmak.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            KARNER kimdir?
          </h2>
          <p className="leading-relaxed text-white/70">
            KARNER, yazılım mühendisliği ile medya üretimini aynı ekipte
            toplayan bir dijital stüdyodur. Kod yazan tarafımız modern web ve
            mobil teknolojileriyle üretir; medya tarafımız yapay zekâ destekli
            video, görsel ve marka diliyle bu üretimi görünür kılar. İki
            disiplini ayrı ajanslara bölmek yerine tek çatıda birleştirdiğimiz
            için strateji, üretim ve yayın aynı elden, tutarlı ilerler.
          </p>
          <ul className="mt-6 space-y-3">
            {team.map((m) => (
              <li key={m.name} id={m.id} className="flex items-baseline gap-3">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent/70" />
                <span className="text-white">{m.name}</span>
                <span className="text-white/50">— {m.role}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Ne yapıyoruz?
          </h2>
          <p className="mb-6 leading-relaxed text-white/70">
            Yerel işletmelerden dijital ürün fikirlerine kadar farklı
            ölçeklerde çalışıyoruz. Hizmetlerimiz:
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
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Bizi farklı kılan ne?
          </h2>
          <p className="leading-relaxed text-white/70">
            Klasik ajanslar siteyi teslim edip çekilir; biz sitenin{" "}
            <strong className="text-white">bulunmasını</strong> işin merkezine
            koyarız. Yapay zekâ aramalarının klasik aramanın yanına
            yerleştiği bir dönemde; içerik, yapısal veri ve teknik SEO'yu üç
            arama yüzeyi için birden kurarız — Google, cevap motorları ve
            ChatGPT/Gemini gibi üretken arama araçları.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            Bu yaklaşımın kanıtı sahada: AYSA Endüstriyel Temizlik için
            &ldquo;muğla baca temizliği&rdquo; aramasında üç yüzeyde birden
            görünürlük sağladık — ChatGPT firmayı öneriyor, Google AI Bakışı
            tercih edilen firmalar arasında gösteriyor ve organik sonuçlarda
            2. sıradayız.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Nasıl çalışıyoruz?
          </h2>
          <p className="leading-relaxed text-white/70">
            Modern ve kanıtlanmış bir teknoloji yığınıyla üretiyoruz: web'de
            Next.js ve Three.js, mobilde Expo, arka planda Supabase, otomasyonda
            n8n ve dil modeli API'leri, medya üretiminde Veo, Kling ve Adobe Firefly.
            Tekrarlayan işleri otomasyona devrettiğimiz için zamanımız tasarıma,
            stratejiye ve kaliteye kalır. Her projede önce hedefi netleştirir,
            sonra ölçülebilir sonuca göre üretiriz.
          </p>
        </section>

        {/* İletişim CTA */}
        <section className="rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold text-white">
            Birlikte çalışalım
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Projenizi konuşmak için bize ulaşın — telefon, e-posta veya site
            üzerinden.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#iletisim" className="btn btn-primary">
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

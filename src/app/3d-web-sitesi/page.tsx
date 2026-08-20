import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { PILLAR_3D, PILLAR_3D_FAQ } from "@/data/pillar-3d";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";
import { pageDates } from "@/data/dates";
import { guidesByCluster } from "@/data/guides";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleMeta from "@/components/seo/ArticleMeta";

export const metadata: Metadata = {
  title: { absolute: PILLAR_3D.seoTitle },
  description: PILLAR_3D.seoDescription,
  alternates: { canonical: `/${PILLAR_3D.slug}` },
  openGraph: {
    title: PILLAR_3D.seoTitle,
    description: PILLAR_3D.seoDescription,
    url: `/${PILLAR_3D.slug}`,
  },
};

const pageUrl = `${SITE_URL}/${PILLAR_3D.slug}`;
const dates = pageDates(`/${PILLAR_3D.slug}`);
const spokes = guidesByCluster("web");
const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Rehberler", href: "/rehber" },
  { name: PILLAR_3D.title, href: `/${PILLAR_3D.slug}` },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${pageUrl}#article`,
      headline: PILLAR_3D.title,
      description: PILLAR_3D.seoDescription,
      abstract: PILLAR_3D.summary,
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
      name: PILLAR_3D.seoTitle,
      description: PILLAR_3D.seoDescription,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      datePublished: dates.published,
      dateModified: dates.modified,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#article` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
      about: { "@id": `${SITE_URL}/hizmetler/web-sitesi-gelistirme#service` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".speakable-summary"],
      },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: PILLAR_3D_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const comparison = [
  {
    k: "Ürün sunumu",
    klasik: "Sabit fotoğraf galerisi",
    ucD: "Döndürülebilir, yakınlaştırılabilir gerçek zamanlı model",
  },
  {
    k: "Ziyaretçi etkileşimi",
    klasik: "Kaydır ve tıkla",
    ucD: "Sahneyle oynama: döndürme, renk/varyant değiştirme, keşfetme",
  },
  {
    k: "Akılda kalıcılık",
    klasik: "Rakip sitelerle benzer deneyim",
    ucD: "Sektöründe az rastlanan, hatırlanan deneyim",
  },
  {
    k: "İçerik güncelleme",
    klasik: "Fotoğraf çekimini yenilemek gerekir",
    ucD: "Aynı model yeni renk/varyantla yeniden kullanılır",
  },
  {
    k: "Yükleme davranışı",
    klasik: "Sayfayla birlikte",
    ucD: "Sahne yalnızca ekrana geldiğinde yüklenir; ilk açılış etkilenmez",
  },
];

const sectors = [
  {
    t: "Mobilya ve mimarlık",
    d: "Ürün konfigüratörü: koltuğun kumaşını, masanın ahşabını ziyaretçi kendisi değiştirir; mekân tasarımı üç boyutta gezilir.",
  },
  {
    t: "Emlak ve inşaat",
    d: "Proje daha temeli atılmadan üç boyutlu gezilebilir; kat planları etkileşimli maket gibi sunulur.",
  },
  {
    t: "Mücevher ve aksesuar",
    d: "360° ürün görüntüleme fotoğrafın gösteremediği işçiliği gösterir; taşın ışıkla oyunu tarayıcıda izlenir.",
  },
  {
    t: "Teknoloji ve endüstriyel ürün",
    d: "Parçalarına ayrılan (exploded view) model, ürünün içindeki mühendisliği satış argümanına çevirir.",
  },
  {
    t: "Marka ve ajans siteleri",
    d: "Hero bölümündeki özel 3D sahne markanın karakterini ilk saniyede anlatır — bu sitenin açılışındaki robot sahnesi gibi.",
  },
];

export default function Pillar3DPage() {
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
            3D Web Sitesi: Markanızı Üç Boyutta Anlatan Modern Web
          </h1>
          <ArticleMeta dates={dates} />

          {/* TL;DR — speakable */}
          <div className="speakable-summary mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">
              Özet
            </p>
            <p className="leading-relaxed text-white/85">
              <strong className="text-white">{PILLAR_3D.summary}</strong>{" "}
              Bu rehberde 3D web sitesinin ne olduğunu, hangi işletmelere değer
              kattığını, hız ve SEO ile ilişkisini ve üretim sürecinin nasıl
              işlediğini anlatıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            3D web sitesi nedir?
          </h2>
          <dl className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <dt className="font-semibold text-white">3D web sitesi</dt>
            <dd className="mt-2 leading-relaxed text-white/70">
              Ziyaretçinin fareyle veya dokunuşla etkileşime girebildiği,
              tarayıcıda gerçek zamanlı çizilen üç boyutlu sahneler içeren web
              sitesidir. Sahne bir video değildir; ekran kartında o an
              hesaplanır ve ziyaretçinin hareketine anında tepki verir.
            </dd>
          </dl>
          <p className="leading-relaxed text-white/70">
            Bu deneyimi mümkün kılan teknoloji <strong className="text-white">WebGL</strong>{" "}
            — tarayıcının ekran kartını kullanarak grafik çizmesini sağlayan,
            on yılı aşkın süredir tüm büyük tarayıcılarda bulunan web
            standardı. Üzerine kurulan{" "}
            <strong className="text-white">Three.js</strong> ve{" "}
            <strong className="text-white">React Three Fiber</strong>{" "}
            kütüphaneleri, 3D sahneyi modern bir web uygulamasının parçası
            hâline getirir. Yeni nesil <strong className="text-white">WebGPU</strong>{" "}
            standardı da aynı kütüphanelerin altında yerini almaya başladı —
            bugün kurulan bir 3D site, teknoloji ilerledikçe aynı temelle
            güncel kalır.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            Kritik ayrım şu: 3D web sitesi, sayfaya gömülmüş bir video veya
            hazır animasyon değildir.{" "}
            <strong className="text-white">
              Gerçek zamanlı 3D sahne, ziyaretçiye izleyici değil katılımcı
              rolü verir.
            </strong>{" "}
            Ürünü kendisi döndüren, rengi kendisi değiştiren ziyaretçi, o
            ürünle fotoğrafa bakan ziyaretçiden daha uzun süre ilgilenir.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Klasik siteden farkı ne?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="px-5 py-4 font-semibold text-white"> </th>
                  <th className="px-5 py-4 font-semibold text-white/80">
                    Klasik site
                  </th>
                  <th className="px-5 py-4 font-semibold text-accent-light">
                    3D web sitesi
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.k} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 font-medium text-white">{row.k}</td>
                    <td className="px-5 py-4 text-white/60">{row.klasik}</td>
                    <td className="px-5 py-4 text-white/80">{row.ucD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 leading-relaxed text-white/70">
            Fark yalnızca görsel değil, stratejik:{" "}
            <strong className="text-white">
              3D sahne, ürünün fotoğrafla anlatılamayan yönlerini satış
              argümanına çevirir.
            </strong>{" "}
            Bir koltuğun kumaş dokusu, bir yüzüğün işçiliği, bir binanın
            cephesindeki ışık — bunlar iki boyutta kaybolur, üç boyutta
            konuşur.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            3D web sitesi hangi işletmelere uygun?
          </h2>
          <p className="mb-6 leading-relaxed text-white/70">
            Kestirme cevap: ürünü veya mekânı{" "}
            <strong className="text-white">gösterilerek satılan</strong> her
            işletmeye. Somut senaryolar:
          </p>
          <div className="space-y-4">
            {sectors.map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-white/70">
            Tersine, içeriği ağırlıklı metin olan bir haber sitesi veya
            randevu odaklı basit bir hizmet sayfası için 3D çoğu zaman
            gereksiz yüktür. Bu dürüstlük bizim üretim sürecimizin ilk
            adımıdır: 3D, markaya gerçekten katkı verecekse kurulur —
            vermeyecekse önermeyiz.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            3D bir site hızlı olabilir mi?
          </h2>
          <p className="leading-relaxed text-white/70">
            Evet — ve bu, işin en çok yanlış bilinen tarafı.{" "}
            <strong className="text-white">
              Doğru kurulmuş bir 3D site, Google&apos;ın hız eşiklerini klasik
              siteler gibi geçer.
            </strong>{" "}
            Google, iyi kullanıcı deneyimi için en büyük içeriğin 2,5 saniye
            içinde görünmesini (LCP) ve etkileşim gecikmesinin 200
            milisaniyenin altında kalmasını (INP) ölçüt alır. 3D sahne bu eşikleri şu
            tekniklerle korur:
          </p>
          <ul className="mt-5 space-y-3 text-white/70">
            {[
              "Sahne, sayfayla birlikte değil yalnızca ekrana geldiğinde yüklenir — ilk açılış 3D'den etkilenmez.",
              "Modeller Draco ile sıkıştırılır, dokular KTX2 formatında küçültülür; dosya boyutu büyük oranda düşer.",
              "Mobil cihazlara daha düşük çözünürlüklü doku ve daha sade model gönderilir.",
              "3D'yi desteklemeyen cihazlarda sahnenin yerini aynı bilgiyi veren bir görsel alır.",
              "Hareket azaltma tercihi (prefers-reduced-motion) açık olan ziyaretçilere animasyonlar kapatılır.",
            ].map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent/70" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            3D web sitesini nasıl üretiyoruz?
          </h2>
          <ol className="space-y-5">
            {[
              {
                t: "1. Konsept kapısı",
                d: "Önce şu soruya dürüst cevap verilir: 3D bu markaya gerçekten ne katacak? Katkı netse hangi sahnenin (ürün, mekân, marka karakteri) kurulacağı belirlenir; net değilse klasik ama güçlü bir tasarım öneririz.",
              },
              {
                t: "2. Model ve sahne üretimi",
                d: "Model; açık lisanslı kütüphanelerden seçilir, yapay zekâ destekli üretimle oluşturulur veya Blender'da özel modellenir. Ardından web için optimize edilir: poligon sayısı düşürülür, dokular pişirilir, dosya sıkıştırılır.",
              },
              {
                t: "3. Web entegrasyonu",
                d: "Sahne, React Three Fiber ile sitenin bir bileşeni olarak entegre edilir: yalnızca göründüğünde yüklenir, mobilde hafif sürümü çalışır, erişilebilirlik etiketleri eklenir.",
              },
              {
                t: "4. Ölçüm ve teslim",
                d: "Yayın öncesi sayfa hız testlerinden geçirilir; hedef, 3D'ye rağmen yüksek performans puanıdır. Teslimden sonra da sahne içerik gibi güncellenebilir — yeni renk, yeni varyant, yeni ürün.",
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
            Bu sürecin canlı örneği bu sitenin kendisi: açılıştaki robot
            sahnesi tarayıcınızda gerçek zamanlı çiziliyor, sıkıştırılmış GLB
            modelle yükleniyor ve sayfanın geri kalanını yavaşlatmıyor.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Maliyet neye göre değişir?
          </h2>
          <p className="leading-relaxed text-white/70">
            3D web sitesinde maliyeti belirleyen tek bir fiyat listesi değil,
            üç değişken vardır:{" "}
            <strong className="text-white">sahne sayısı ve karmaşıklığı</strong>{" "}
            (tek hero sahnesi mi, ürün konfigüratörü mü),{" "}
            <strong className="text-white">model kaynağı</strong> (elinizde
            hazır CAD/3D dosyası varsa süre kısalır; sıfırdan modelleme
            gerekiyorsa uzar) ve{" "}
            <strong className="text-white">etkileşim derinliği</strong>{" "}
            (izlenen sahne ile renk/varyant değiştirilen konfigüratör aynı iş
            değildir). Projenizi dinledikten sonra bu üç değişkene göre net
            kapsam ve teklif çıkarırız.
          </p>
        </section>

        {/* SSS */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Sık sorulan sorular
          </h2>
          <div className="space-y-4">
            {PILLAR_3D_FAQ.map((f) => (
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

        {/* İlgili sayfalar + CTA */}
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
            Markanız üç boyutta nasıl görünürdü?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Projenizi konuşalım; 3D&apos;nin size gerçekten katkı verip
            vermeyeceğini de dürüstçe söyleyelim.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#iletisim" className="btn btn-primary">
              Teklif Al
            </Link>
            <Link
              href="/hizmetler/web-sitesi-gelistirme"
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              Web Sitesi Geliştirme Hizmeti
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

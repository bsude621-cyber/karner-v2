import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import FaqList from "@/components/seo/FaqList";
import { pageDates } from "@/data/dates";
import { CONTACT, SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/iletisim";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "İletişim — Teklif ve Keşif Görüşmesi | KARNER";
const DESCRIPTION =
  "KARNER ile iletişime geçin: telefon, e-posta veya form. Muğla ve Ankara merkezli, Türkiye genelinde çalışan yazılım ve medya ajansı. Kısa keşif görüşmesi, yazılı kapsam, net teklif.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "İletişim", href: PATH },
];

const FAQ = [
  {
    q: "Ne kadar sürede dönüş alırım?",
    a: "Form ve e-posta mesajlarına genellikle aynı iş günü içinde dönüyoruz; telefonla ulaşamazsanız kısa bir mesaj bırakın, arayalım. İlk görüşme kısa bir keşiftir: hedefi ve mevcut durumu anlarız, sonra yazılı kapsam göndeririz.",
  },
  {
    q: "Görüşme için ofise gelmem gerekir mi?",
    a: "Gerekmez. Keşif, tasarım onayı ve teslim süreçlerini çevrim içi yürütüyoruz; Türkiye'nin her ilinden işletmelerle bu şekilde çalışıyoruz. İsterseniz Muğla veya Ankara'da yüz yüze de görüşebiliriz.",
  },
  {
    q: "Teklif almak ücretli mi?",
    a: "Hayır. Keşif görüşmesi ve yazılı teklif ücretsizdir; teklifte kapsam, teslim edilecekler ve bedel açıkça yazar. Teklifte yazmayan bir kalem faturalandırılmaz.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
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

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 pb-0 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <h1 className="sr-only">İletişim — KARNER</h1>
          <p className="mt-6 max-w-2xl text-white/70">
            Telefon: <a href={`tel:${CONTACT.phoneE164}`} className="text-white hover:underline">{CONTACT.phoneDisplay}</a>{" "}
            · E-posta: <a href={`mailto:${CONTACT.email}`} className="text-white hover:underline">{CONTACT.email}</a>{" "}
            · Muğla &amp; Ankara, Türkiye geneli.
          </p>
        </div>
      </section>
      <ContactSection />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <FaqList items={FAQ} />
      </div>
      <Footer />
    </main>
  );
}

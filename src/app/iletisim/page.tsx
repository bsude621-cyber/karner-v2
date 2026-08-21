import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { pageDates } from "@/data/dates";
import { SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/iletisim";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "İletişim — Teklif ve Keşif Görüşmesi | KARNER";
const DESCRIPTION =
  "KARNER ile iletişime geçin: telefon, e-posta veya form. Türkiye genelinde çalışan yazılım ve medya ajansı. Kısa keşif görüşmesi, yazılı kapsam, net teklif.";

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
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
    },
    breadcrumbJsonLd(pageUrl, crumbs)
  ],
};

export default function IletisimPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Breadcrumb crumbs={crumbs} />
      </div>
      {/* Ana sayfadaki iletişim bölümünün aynısı — tek bileşen, tek bakım */}
      <ContactSection headingAs="h1" />
      <Footer />
    </main>
  );
}

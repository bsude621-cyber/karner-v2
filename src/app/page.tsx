import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import AboutTeaser from "@/components/AboutTeaser";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/section-divider";
import Showreel from "@/components/Showreel";
import DeferredAssistant from "@/components/DeferredAssistant";
import HomeFaq from "@/components/HomeFaq";
import { HOME_FAQ } from "@/data/home-faq";
import { services } from "@/data/services";
import { pageDates } from "@/data/dates";
import { BRAND_SENTENCE, SITE_URL } from "@/lib/site";

const dates = pageDates("/");

/**
 * Ana sayfa graph'ı: WebPage (speakable) + hizmet ItemList + FAQPage.
 * Organization/WebSite/Person düğümleri layout'ta; burada @id ile bağlanır.
 */
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "KARNER — Yazılım ve Medya Ajansı | 3D Web, Mobil, AI Video",
      description: BRAND_SENTENCE,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
      datePublished: dates.published,
      dateModified: dates.modified,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "#hakkimizda p"],
      },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      hasPart: [{ "@id": `${SITE_URL}/#services` }, { "@id": `${SITE_URL}/#faq` }],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#services`,
      name: "KARNER hizmetleri",
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `${SITE_URL}/hizmetler/${s.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: HOME_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const metadata: Metadata = {
  // Ana sayfa layout'taki default title'ı kullanır; canonical burada sabitlenir.
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />

      <SectionDivider />
      <ServicesSection />

      <SectionDivider />
      <WorksSection />

      <SectionDivider />
      <Showreel />

      <SectionDivider />
      <AboutTeaser />

      <SectionDivider />
      <HomeFaq />

      <SectionDivider />
      <ContactSection />

      <Footer />

      {/* Mobil asistan — sağ-altta sabit sohbet butonu (kritik yol dışında) */}
      <DeferredAssistant />
    </main>
  );
}

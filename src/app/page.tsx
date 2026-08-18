import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import AboutTeaser from "@/components/AboutTeaser";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/section-divider";
import MobileAssistant from "@/components/MobileAssistant";

export const metadata: Metadata = {
  // Ana sayfa layout'taki default title'ı kullanır; canonical burada sabitlenir.
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <SectionDivider />
      <ServicesSection />

      <SectionDivider />
      <WorksSection />

      <SectionDivider />
      <AboutTeaser />

      <SectionDivider />
      <ContactSection />

      <Footer />

      {/* Mobil asistan — sağ-altta sabit sohbet butonu */}
      <MobileAssistant />
    </main>
  );
}

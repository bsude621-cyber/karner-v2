import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/section-divider";
import MobileAssistant from "@/components/MobileAssistant";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <SectionDivider />
      <ServicesSection />

      <SectionDivider />
      <WorksSection />

      <SectionDivider />
      <AboutSection />

      <SectionDivider />
      <ContactSection />

      <Footer />

      {/* Mobil asistan — sağ-altta sabit sohbet butonu */}
      <MobileAssistant />
    </main>
  );
}

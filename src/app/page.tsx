import { Navigation }      from "@/components/navigation/Navigation";
import { HeroSection }     from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PricingSection }  from "@/components/sections/PricingSection";
import { AboutSection }    from "@/components/sections/AboutSection";
import { ContactSection }  from "@/components/sections/ContactSection";
import { Footer }          from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

import { AboutSection, EventDetailsSection, HeroSection, ServicesSection } from "./components/Sections";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}

import { AboutSection } from "../components/Sections";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}

import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FeaturedWork />
        <ExperienceSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

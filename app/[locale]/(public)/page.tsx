// Component imports
import SectionSeparator from "./_components/section-separator";

// Section imports
import HeroSection from "./_sections/hero";
import GallerySection from "./_sections/gallery";
import CountersSection from "./_sections/counters";
import CtaSection from "./_sections/cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionSeparator />

      <CountersSection />
      <SectionSeparator />

      <GallerySection />
      <SectionSeparator />

      <CtaSection />
    </>
  );
}

import { useTranslations } from "next-intl";

// Component imports
import SectionSeparator from "./_components/section-separator";

// Section imports
import HeroSection from "./_sections/hero";
import GallerySection from "./_sections/gallery";
import CountersSection from "./_sections/counters";

export default function HomePage() {
  const t = useTranslations("");

  return (
    <>
      <HeroSection />
      <SectionSeparator />

      <GallerySection />
      <SectionSeparator />

      <CountersSection />
      <SectionSeparator />
    </>
  );
}

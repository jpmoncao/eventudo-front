import { useTranslations } from "next-intl";

// Section imports
import HeroSection from "./_sections/hero";

export default function HomePage() {
  const t = useTranslations("");

  return (
    <>
      <HeroSection />
    </>
  );
}

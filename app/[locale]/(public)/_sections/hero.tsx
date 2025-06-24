import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
    const t = useTranslations("");

    return (
        <section>
            <h1 className="text-4xl font-bold font-heading text-center">{t("pages.home.hero.title")} <strong className="text-primary">{t("globals.appName")}!</strong></h1>
            <p className="mt-4 text-lg text-center">{t("pages.home.hero.description")}</p>
            <Image
                src="/images/hero.svg"
                alt={t("pages.home.hero.imageAlt")}
                width={500}
                height={300}
                className="mx-auto mt-8 drop-shadow-[0_0_40px] drop-shadow-primary-foreground/30 dark:drop-shadow-primary/30"
            />
            <div className="mt-6 w-full flex justify-center">
                <Button className="cta-gradient">{t("pages.home.hero.cta")}</Button>
            </div>
        </section>
    )
}
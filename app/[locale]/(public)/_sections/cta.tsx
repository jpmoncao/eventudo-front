import { useTranslations } from "next-intl";

export default function CtaSection() {
    const t = useTranslations('pages.home.cta');

    return (
        <section className="bg-primary/30 dark:bg-primary/10 rounded-2xl shadow-[0_0_40px_10px] shadow-primary/40 dark:shadow-primary/5 px-4 py-8 md:py-32 max-w-[800px] mx-auto bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-primary-foreground/60 dark:border-primary/90 mb-12">
            <h1 className="text-4xl font-bold font-heading text-center text-foreground">{t('title')}</h1>
            <p className="text-lg text-center sm:max-w-2/3 mx-auto text-foreground">{t('description')}</p>
            <div className="flex justify-center mt-8">
                <a
                    href="/join"
                    className="text-center w-48 px-6 py-3 rounded-full cta-gradient font-bold text-lg text-foreground text-shadow-lg shadow-lg border not-dark:border-primary-foreground/60"
                >
                    {t('button')}
                </a>
            </div>
        </section>
    );
}
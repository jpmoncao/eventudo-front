import Link from "next/link";
import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
    const t = useTranslations();

    return (
        <footer className="flex flex-col items-center justify-center w-full pt-12 pb-4 border-t bg-foreground/80 text-background dark:bg-foreground/10 dark:text-foreground gap-6">
            <section className="w-full flex flex-col md:flex-row items-start justify-center md:justify-around gap-12 max-w-3xl px-4">
                <article>
                    <ul className="flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-x-12 gap-y-1">
                        <span className="font-bold text-background/80 dark:text-foreground/80 w-full">{t('globals.footer.navigation.title')}</span>
                        <li><a className="font-normal hover:underline hover:opacity-80" href="#counters">{t('globals.footer.navigation.counters')}</a></li>
                        <li><a className="font-normal hover:underline hover:opacity-80" href="#gallery">{t('globals.footer.navigation.gallery')}</a></li>
                        <li><a className="font-normal hover:underline hover:opacity-80" href="#join">{t('globals.footer.navigation.join')}</a></li>
                    </ul>
                </article>
                <article>
                    <ul className="flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-x-12 gap-y-1">
                        <span className="font-bold text-background/80 dark:text-foreground/80 w-full">{t('globals.footer.socialMedia.title')}</span>
                        <li><a className="font-normal hover:underline hover:opacity-80" href={t('globals.footer.socialMedia.socialMedia-1.link')} target="_blank">{t('globals.footer.socialMedia.socialMedia-1.name')}</a></li>
                        <li><a className="font-normal hover:underline hover:opacity-80" href={t('globals.footer.socialMedia.socialMedia-2.link')} target="_blank">{t('globals.footer.socialMedia.socialMedia-2.name')}</a></li>
                        <li><a className="font-normal hover:underline hover:opacity-80" href={t('globals.footer.socialMedia.contact.link')} target="_blank">{t('globals.footer.socialMedia.contact.name')}</a></li>
                    </ul>
                </article>
                <article>
                    <ul className="flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-x-12 gap-y-1">
                        <span className="font-bold text-background/80 dark:text-foreground/80 w-full">{t('globals.footer.legal.title')}</span>
                        <li><Link className="font-normal hover:underline hover:opacity-80" href="/privacy-policy">{t('globals.footer.legal.privacyPolicy')}</Link></li>
                        <li><Link className="font-normal hover:underline hover:opacity-80" href="/terms-of-service">{t('globals.footer.legal.termsOfService')}</Link></li>
                    </ul>
                </article>
            </section>

            <Separator className="px-4" />

            <p className="text-sm">
                &copy; {new Date().getFullYear()} {t('globals.businessName')}. {t('globals.footer.allRightsReserved')}.
            </p>
        </footer>
    );
}
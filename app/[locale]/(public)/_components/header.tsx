import { use } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";

import HamburgerMenu, { MenuItem } from "@/components/ui/hamburger-menu";
import { LocaleButton } from "@/components/ui/locale-button";
import { ThemeButton } from "@/components/ui/theme-button";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Header() {
    const t = useTranslations("globals");

    const menuItems: MenuItem[] = [
        { title: t('header.home'), href: "/" },
        { title: t('header.events'), href: "/events" },
        { title: t('header.about'), href: "/about" }
    ]

    const cookieStore = use(cookies());

    return (
        <header className="flex items-center justify-between p-4 bg-background text-foreground h-20">
            <Link href='/'>
                <h1 className="text-primary">{t('appName')}</h1>
            </Link>

            <div className="flex items-center space-x-1 h-full py-3 lg:space-x-4">
                <ThemeButton />
                <Separator orientation="vertical" />

                <LocaleButton />
                <Separator orientation="vertical" />

                <HamburgerMenu menuItems={menuItems} />

                <nav className="hidden lg:flex">
                    <ul className="flex items-center space-x-4 lg:gap-8 lg:px-8">
                        {menuItems.map((item) => (
                            <Link key={item.title} href={item.href ?? '/'} className="hover:underline hover:text-foreground/60">{item.title}</Link>
                        ))}
                        <Link href='/login' className={cookieStore.has('Authorization') ? 'hidden' : ''}>
                            <Button variant='secondary'>{t('header.login')}</Button>
                        </Link>
                        <Link href='/profile' className={!cookieStore.has('Authorization') ? 'hidden' : ''}>
                            <Button variant='secondary'>{t('header.profile')}</Button>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header >
    );
}
import Link from "next/link";
import { useTranslations } from "next-intl";

import HamburgerMenu, { MenuItem } from "@/components/ui/hamburger-menu";

export default function Header() {
    const t = useTranslations("globals");

    const menuItems: MenuItem[] = [
        { title: t('header.home'), href: "/" },
        { title: t('header.events'), href: "/events" },
        { title: t('header.about'), href: "/about" },
    ]

    return (
        <header className="flex items-center justify-between p-4 bg-background text-foreground">
            <h1 className="text-primary">{t('appName')}</h1>

            <HamburgerMenu menuItems={menuItems} />
            <nav className="hidden lg:flex">
                <ul className="flex space-x-4">
                    {menuItems.map((item) => (
                        <Link key={item.title} href={item.href ?? '/'} className="hover:underline hover:text-foreground/60">{item.title}</Link>
                    ))}
                </ul>
            </nav>
        </header >
    );
}
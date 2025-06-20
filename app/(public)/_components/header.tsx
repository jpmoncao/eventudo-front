import Link from "next/link";
import HamburgerMenu, { MenuItem } from "@/components/ui/hamburger-menu";

const menuItems: MenuItem[] = [
    { title: "Home", href: "/" },
    { title: "Eventos", href: "/events" },
    { title: "Sobre", href: "/about" },
]

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-background text-foreground">
            <h1 className="text-primary">Eventudo</h1>

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
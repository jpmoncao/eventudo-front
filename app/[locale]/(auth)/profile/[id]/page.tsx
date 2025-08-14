import { Separator } from "@/components/ui/separator"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Calendar1, LogOut } from "lucide-react"

export default async function ProfileIdPage() {
    const t = await getTranslations('pages.profile')

    const items1 = [
        {
            icon: <Calendar1 />,
            href: '/myevents',
            label: t('list.yourEvents')
        },
        {
            icon: <Calendar1 />,
            href: '/myevents',
            label: t('list.yourEvents')
        },
    ];

    const items2 = [
        {
            icon: <LogOut />,
            href: '/logout',
            label: t('list.logout')
        },
    ];

    return (
        <section>
            <main className="pt-12">
                <section className="px-2 space-y-6 max-w-[600px] mx-auto">
                    <article className="flex items-center gap-3">
                        <div className="h-18 w-18 bg-muted-foreground rounded-full"></div>
                        <div className="flex flex-col">
                            <h1 className="text-lg">Nome Sobrenome</h1>
                            <p className="text-sm text-muted-foreground -mt-2">email@email.com</p>
                        </div>
                    </article>

                    <Separator />

                    <ul>
                        {items1.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="flex gap-2 py-4 px-4 rounded-md hover:bg-foreground/10 "
                                    href={item.href}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Separator />

                    <ul>
                        {items2.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="flex gap-2 py-4 px-4 rounded-md hover:bg-foreground/10 "
                                    href={item.href}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Separator />
                </section>
            </main>
        </section>
    )
}
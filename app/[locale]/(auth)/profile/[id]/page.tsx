// Libraries Imports
import { Link, redirect } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Calendar1, LogOut } from "lucide-react";
import { toast } from "sonner";

// Components Import
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Lib Imports
import { api } from "@/lib/axios";
import { getSession } from "@/lib/auth";

// Interface Imports
import { IUser } from "@/interfaces/user";

const fetchUser = async (id: string): Promise<IUser | null> => {
    const t = await getTranslations();

    try {
        const data = await api
            .get(`/users/${id}`)
            .then((response) => response.data.data)
            .catch((error) => {
                console.error(error);

                switch (error.status) {
                    case 500:
                        toast.error(t('messages.errors.unexpected'))
                        break;
                    default:
                        toast.error(error.response.data.message)
                        break;
                }
            })

        return data as IUser;
    } catch {
        return null;
    }
};

export default async function ProfileIdPage({ params }: { params: { id: string } }) {
    const locale = await getLocale();
    const t = await getTranslations('pages.profile');

    const session = await getSession();
    const sessionId = session?.id;

    const userId = await params.id;

    if (userId !== sessionId)
        redirect({ href: '/profile', locale});

    const userData = await fetchUser(userId);

    const items1 = [
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
                        <div className="flex flex-col grow">
                            <h1 className="text-lg w-full">{userData ? (userData?.name + ' ' + userData?.lastName) : <Skeleton className="w-1/2 h-4" />}</h1>
                            <p className="text-sm text-muted-foreground -mt-2">{userData ? userData?.email : <Skeleton className="w-2/3 h-2 mt-3" />}</p>
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
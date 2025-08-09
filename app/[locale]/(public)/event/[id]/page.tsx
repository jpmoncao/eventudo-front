// Lib Imports
import { CalendarClock, ChevronLeft, MapPinIcon, TicketCheck } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { toast } from "sonner";
import { api } from "@/lib/axios";

// Components Imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EventImagesGallery } from "./_components/event-images-gallery";
import { EventPriceTag } from "./_components/event-price-tag";

// Interfaces Imports
import { IEvent } from "@/interfaces/event";

interface EventPageProps {
    params: {
        id: string;
        locale: string;
    };
}

const fetchEvent = async (id: string): Promise<IEvent | null> => {
    const t = await getTranslations();
    
    try {
        const data = await api
            .get(`/events/${id}`)
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

        return data as IEvent;
    } catch {
        return null;
    }
};

export default async function EventPage({ params }: EventPageProps) {
    const { id, locale } = await params;

    if (!id) return notFound();

    const locales = locale === "en" ? "en-US" : "pt-BR";
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    const event = await fetchEvent(id);
    if (!event) return notFound();

    const t = await getTranslations("pages.event");

    return (
        <section>
            <article className="flex gap-4 items-end relative pt-12 flex-wrap sm:flex-nowrap">
                <div className="flex-grow flex flex-col justify-end items-start">
                    <p className="text-xs text-foreground/70">{event.location}</p>
                    <h1 className="text-4xl font-bold font-heading text-foreground">
                        {event.name}
                    </h1>
                    <p className="text-md text-foreground/70">{event.short_description}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 mb-1">
                    <p className="text-xs text-foreground/60 flex gap-1.5 items-start">
                        <CalendarClock size={16} />
                        {new Date(event.date).toLocaleDateString(locales, dateOptions)}
                    </p>
                    <p className="text-xs text-foreground/60 flex gap-1.5 items-start">
                        <MapPinIcon size={16} /> {event.address}
                    </p>
                </div>
                <Link href={`/events`} className="absolute top-0 left-0">
                    <Button variant='ghost' className="has-[>svg]:pl-0" >
                        <ChevronLeft /> {t("backToEvents")}
                    </Button>
                </Link>
                <Link href={`/checkout/${id}`} className="absolute top-0 right-0">
                    <Button className="cta-gradient shadow-[0_0_20px_6px] shadow-primary/40 dark:shadow-primary/20">
                        <TicketCheck /> {t("buyTicket")}
                    </Button>
                </Link>
            </article>

            <Separator className="my-4" />

            <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{t("description")}</h2>
                    <p className="text-md text-foreground/80">{event.description}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-lg font-semibold">{t("price")}</h2>
                    <EventPriceTag
                        price={event.price}
                        promotion={event.promotion}
                        locale={locale}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{t("images")}</h2>
                    <EventImagesGallery eventName={event.name} images={event.images ?? []} />
                </div>
            </article>

            <Separator className="my-4" />

            <article className="flex flex-col items-center gap-4 mx-auto">
                <h3 className="text-2xl font-semibold">{t("ensureTicket")}:</h3>
                <Link href={`/checkout/${id}`} className="pb-12">
                    <Button className="flex items-center text-xl font-bold w-64 h-16 cta-gradient shadow-[0_0_40px_10px] shadow-primary/40 dark:shadow-primary/20">
                        <TicketCheck className="size-6" /> {t("buyTicket")}
                    </Button>
                </Link>
            </article>
        </section>
    );
}

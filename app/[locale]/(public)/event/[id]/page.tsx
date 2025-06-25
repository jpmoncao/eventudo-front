'use client'

import { DateTimeFormatOptions, NumberFormatOptions, useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { CalendarClock, MapPinIcon, TicketCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function EventPage() {
    const t = useTranslations('pages.event');

    const { id, locale } = useParams();

    const locales = locale === 'pt' ? 'pt-BR' : 'en-US';
    const currency = locale === 'pt' ? 'BRL' : 'USD';

    const moneyOption: NumberFormatOptions = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency,
        currencyDisplay: 'symbol'
    };

    const dateOptions: DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const event = {
        id,
        name: "Sample Event",
        short_description: "This is a sample event description.",
        description: "Join us for an exciting event filled with fun and learning. Don't miss out on the opportunity to connect with others and enjoy a great time together.",
        date: "2024-05-01T10:00:00Z",
        location: "Fernandópolis, SP - Brasil",
        address: "Rua Exemplo, 123, Bairro Exemplo",
        price: 50.00,
        images: [
            'https://southcorp.com.br/wp-content/uploads/2018/10/sEGURO-eVENTOS-1.jpg',
            'https://www.sp.senac.br/documents/portlet_file_entry/51828463/dicas+para+um+evento+de+sucesso.webp/0453a6e1-5c79-ba90-d46d-009062d3ad4d',
            'https://digipaper.com.br/wp-content/uploads/2019/01/2018_05_04.jpg',
            'https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg',
            'https://www.espacomatodentro.com.br/wp-content/uploads/2019/07/espaco-para-eventos-em-campinas.jpg',
        ],
        promotional: {
            isActive: true,
            price: 29.90
        }
    }

    return (
        <section>
            <article className="flex gap-4 items-end relative pt-8">
                <div className="flex-grow flex flex-col justify-end items-start">
                    <p className="text-xs text-foreground/70">{event.location}</p>
                    <h1 className="text-4xl font-bold font-heading text-foreground">{event.name}</h1>
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
                <Link href={`/checkout/${id}`} className="absolute top-0 right-0">
                    <Button className="cta-gradient shadow-[0_0_20px_6px] shadow-primary/40 dark:shadow-primary/20"><TicketCheck /> {t('buyTicket')}</Button>
                </Link>
            </article>

            <Separator className="my-4" />

            <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{t('description')}</h2>
                    <p className="text-md text-foreground/80">{event.description}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-lg font-semibold">{t('price')}</h2>
                    <p className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-primary text-shadow-md text-shadow-primary-foreground/60">{
                            event.promotional.isActive
                                ? event.promotional.price.toLocaleString(locales, moneyOption)
                                : event.price.toLocaleString(locales, moneyOption)
                        }</span>
                        <span className="text-lg font-normal text-destructive line-through">{
                            event.promotional.isActive && event.price.toLocaleString(locales, moneyOption)
                        }</span>
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{t('images')}</h2>
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 px-2">
                        {event.images.map((image, index) => (
                            <img key={index} src={image} alt={`Event Image ${index + 1}`} className="w-full h-full rounded-md border" />
                        ))}
                    </div>
                </div>
            </article>

            <Separator className="my-4" />

            <article className="flex flex-col items-center gap-4 mx-auto">
                <h3 className="text-2xl font-semibold">{t('ensureTicket')}:</h3>
                <Link href={`/checkout/${id}`} className="pb-12">
                    <Button className="flex items-center text-xl font-bold w-64 h-16 cta-gradient shadow-[0_0_40px_10px] shadow-primary/40 dark:shadow-primary/20">
                        <TicketCheck className="size-6" /> {t('buyTicket')}
                    </Button>
                </Link>
            </article>
        </section>
    );
}
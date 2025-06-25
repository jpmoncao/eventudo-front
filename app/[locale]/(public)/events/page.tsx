import React from "react";
import Link from "next/link";

// Components Imports
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

import CardCarousel from "./_components/card-carousel";
import { useTranslations } from "next-intl";

// Tipagem dos eventos
type EventType = {
    id: string;
    name: string;
    description: string;
    image: string;
    id_category: string;
};

type CategoryType = {
    id: string;
    name: string;
    description: string;
};

const EventCategory = ({
    category,
    events
}: {
    category: CategoryType;
    events: EventType[];
}) => {
    const t = useTranslations("pages.events");
    const categoryEvents = events.filter(event => event.id_category === category.id);

    if (categoryEvents.length === 0) {
        return (
            <div className="space-y-1">
                <h1 className="text-2xl font-bold w-full mb-1">{category.name}</h1>
                <p className="text-sm w-full text-foreground/70">{category.description}</p>
                <Separator className="my-4 w-full" />
                <p className="text-sm text-foreground/70 text-center">{t('eventsNotFoundByCategory')}</p>
            </div>
        )
    }

    return (
        <div className="space-y-1">
            <h1 className="text-2xl font-bold w-full mb-1">{category.name}</h1>
            <p className="text-sm w-full text-foreground/70">{category.description}</p>

            <Separator className="my-4 w-full" />

            <div className="w-full">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-sm sm:max-w-full flex items-center justify-center gap-2 mx-auto"
                >
                    <CarouselPrevious className="flex relative left-0 top-0 translate-0" />
                    <CarouselContent className="w-full flex gap-2">
                        {categoryEvents.map((event) => (
                            <CarouselItem
                                key={event.id}
                                className="basis-full sm:basis-1/2 md:basis-1/3"
                            >
                                <Link
                                    href={`/event/${event.id}`}
                                    className="p-1 block h-full"
                                >
                                    <CardCarousel.Root
                                        imageURL={event.image}
                                        imageAlt={event.name}
                                        className="w-full h-full"
                                    >
                                        <CardCarousel.Text
                                            title={event.name}
                                            description={event.description}
                                        />
                                    </CardCarousel.Root>
                                </Link>
                            </CarouselItem>
                        ))}
                        {/* Padding extra no final do carrossel */}
                        <CarouselItem className="basis-4"></CarouselItem>
                    </CarouselContent>
                    <CarouselNext className="flex relative right-0 top-0 translate-0" />
                </Carousel>
            </div>
        </div>
    )
}

export default function EventsPage() {
    const events: EventType[] = [
        {
            id: "1",
            name: "Evento",
            description: "Lorem ipsum dolor sit amet.",
            id_category: "1",
            image: "https://southcorp.com.br/wp-content/uploads/2018/10/sEGURO-eVENTOS-1.jpg",
        },
        {
            id: "2",
            name: "Evento",
            description: "Lorem ipsum dolor sit amet.",
            id_category: "1",
            image: "https://www.sp.senac.br/documents/portlet_file_entry/51828463/dicas+para+um+evento+de+sucesso.webp/0453a6e1-5c79-ba90-d46d-009062d3ad4d",
        },
        {
            id: "3",
            name: "Evento",
            description: "Lorem ipsum dolor sit amet.",
            id_category: "1",
            image: "https://digipaper.com.br/wp-content/uploads/2019/01/2018_05_04.jpg",
        },
        {
            id: "4",
            name: "Evento",
            description: "Lorem ipsum dolor sit amet.",
            id_category: "2",
            image: "https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg",
        },
        {
            id: "5",
            name: "Evento",
            description: "Lorem ipsum dolor sit amet.",
            id_category: "3",
            image: "https://www.espacomatodentro.com.br/wp-content/uploads/2019/07/espaco-para-eventos-em-campinas.jpg",
        },
    ];

    const categories: CategoryType[] = [
        { id: "1", name: "Categoria 1", description: "Descrição da Categoria 1" },
        { id: "2", name: "Categoria 2", description: "Descrição da Categoria 2" },
        { id: "3", name: "Categoria 3", description: "Descrição da Categoria 3" },
        { id: "4", name: "Categoria 4", description: "Descrição da Categoria 4" }
    ];

    return (
        <section className="space-y-8">
            {
                categories.map((category) => (
                    <EventCategory
                        key={category.id}
                        category={category}
                        events={events}
                    />
                ))
            }
        </section>
    );
}

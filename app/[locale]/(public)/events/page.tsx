// Lib Imports
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { getTranslations } from "next-intl/server";
import { api } from "@/lib/axios";

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

// Interfaces Imports
import { IEvent, ICategory } from "@/interfaces/event";

const EventCategory = ({
    category,
    events
}: {
    category: ICategory;
    events: IEvent[];
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

            <div className="w-full min-h-48">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-sm sm:max-w-full flex items-center justify-center gap-2 mx-auto"
                >
                    <CarouselPrevious className="flex relative left-0 top-0 translate-0" />
                    <CarouselContent className="w-full min-h-full flex gap-2">
                        {categoryEvents.map((event) => (
                            <CarouselItem
                                key={event.id}
                                className="basis-full sm:basis-1/2 md:basis-1/3"
                            >
                                <Link
                                    prefetch={false}
                                    href={`/event/${event.id}`}
                                    className="p-1 block h-full"
                                >
                                    <CardCarousel.Root
                                        imageURL={(event.images && event.images[0]?.url) ? event.images[0].url : 'https://picsum.photos/1024/768?blur'}
                                        imageAlt={event.name}
                                        className="w-full h-full bg-foreground/20"
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

const fetchEvents = async () => {
    const t = await getTranslations();

    try {
        const data = await api
            .get('/events')
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

        return data as IEvent[];
    } catch {
        return [];
    }
};


const fetchCategories = async () => {
    const t = await getTranslations();

    try {
        const data = await api
            .get('/categories')
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

        return data as ICategory[];
    } catch {
        return [];
    }
};

export default async function EventsPage() {
    const events = await fetchEvents();
    const categories = await fetchCategories();

    return (
        <section className="space-y-8">
            {
                events &&
                categories &&
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

import { useTranslations } from "next-intl";
import Image from "next/image";
import { EmblaOptionsType } from 'embla-carousel'

import EmblaCarousel from "@/components/ui/custom-carousel/js/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

export default function GallerySection() {
    const t = useTranslations("pages.home.gallery");

    // Imagens para o carrossel
    const images = [
        'https://southcorp.com.br/wp-content/uploads/2018/10/sEGURO-eVENTOS-1.jpg',
        'https://www.sp.senac.br/documents/portlet_file_entry/51828463/dicas+para+um+evento+de+sucesso.webp/0453a6e1-5c79-ba90-d46d-009062d3ad4d',
        'https://digipaper.com.br/wp-content/uploads/2019/01/2018_05_04.jpg',
        'https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg',
        'https://www.espacomatodentro.com.br/wp-content/uploads/2019/07/espaco-para-eventos-em-campinas.jpg',
    ]

    const slides = Array.from({ length: images.length }, (_, index) => (
        <img
            key={index}
            src={images[index]}
            alt={t("slideAlt", { eventName: index + 1 })}
            className="w-full h-full object-cover"
        />
    ));

    return (
        <section className="space-y-4">
            <h1 className="text-4xl font-bold font-heading text-center">{t("title")}</h1>
            <p className="text-lg text-center">{t("description")}</p>
            <EmblaCarousel slides={slides} options={OPTIONS} />
        </section>
    );
}
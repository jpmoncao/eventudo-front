import { IImage } from "@/interfaces/event";

export const EventImagesGallery = ({ eventName, images }: { eventName: string; images: Partial<IImage>[] }) => (
    images.length === 0 ? (
        <p className="text-sm text-foreground/70 text-center my-12">Nenhuma imagem disponível para este evento.</p>
    ) : (
        <div className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 px-2">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.url}
                    alt={`Imagem ${index + 1} do evento ${eventName}`}
                    className="w-full h-full rounded-md border"
                />
            ))}
        </div>
    )
);

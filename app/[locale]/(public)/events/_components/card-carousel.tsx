import { cn } from "@/lib/utils";

const CardText = ({ title, description, className }: { title: string, description: string, className?: string }) => (
    <div className={cn("absolute bottom-0 left-0 p-4 w-full", className)}>
        <h3 className="text-2xl font-bold text-neutral-100 tracking-tighter">
            {title}
        </h3>
        <p className="w-[90%] truncate text-sm text-neutral-300">
            {description}
        </p>
    </div>
)

const CardBody = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
    <div className={cn("absolute bottom-0 left-0 p-4 w-full", className)}>
        {children}
    </div>
);

const CardContainer = ({
    imageURL,
    imageAlt,
    className,
    children,
}: {
    imageURL: string;
    imageAlt: string;
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl relative aspect-[4/3] overflow-hidden group transition-transform duration-300 hover:scale-[1.02]",
                className
            )}
        >
            <img
                src={imageURL}
                alt={imageAlt}
                className="object-cover w-full h-full"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
            <div className="z-20 relative">
                {children}
            </div>
        </div>
    );
};

const CardCarousel = {
    Root: CardContainer,
    Content: CardBody,
    Text: CardText,
};

export default CardCarousel;
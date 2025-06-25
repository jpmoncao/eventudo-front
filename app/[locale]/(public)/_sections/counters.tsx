import { Counter } from "@/components/ui/counter";
import { Calendar, NotebookPen, User2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CountersSection() {
    const t = useTranslations("pages.home.counters");

    const iconClassName = "text-foreground w-12 h-12";
    const counters = [
        { icon: <Calendar className={iconClassName} />, label: t("item-1.label"), to: 150 },
        { icon: <User2 className={iconClassName} />, label: t("item-2.label"), to: 10000 },
        { icon: <NotebookPen className={iconClassName} />, label: t("item-3.label"), to: 40 }
    ]


    return (
        <section id="counters" className="bg-primary/30 dark:bg-primary/10 shadow-[0_0_40px_10px] shadow-primary/40 dark:shadow-primary/5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-primary-foreground/60 dark:border-primary/90 space-y-4 px-4 py-8 md:py-32 rounded-2xl max-w-[800px] mx-auto">
            <h1 className="text-4xl font-bold font-heading text-center">{t("title")}</h1>
            <p className="text-lg text-center sm:max-w-2/3 mx-auto">{t("description")}</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8 w-full sm:w-[90%] mx-auto">
                {counters.map((counter, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                        {counter.icon}
                        <span className="text-6xl font-bold text-shadow-md text-shadow-primary-foreground/60 text-primary">
                            <Counter
                                from={0}
                                to={counter.to}
                                animationOptions={{ duration: 0.25 }}
                                className="text-6xl font-bold text-shadow-md text-shadow-primary-foreground/60 text-primary"
                            />+
                        </span>
                        <p className="text-lg text-foreground/60">{counter.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
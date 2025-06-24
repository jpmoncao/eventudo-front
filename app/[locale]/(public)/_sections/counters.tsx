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
        <section className="space-y-4 px-4 py-8 md:py-32 border rounded-2xl shadow-[0_-10px_40px_10px] shadow-primary-foreground/20 dark:shadow-primary/5 max-w-[800px] mx-auto">
            <h1 className="text-4xl font-bold font-heading text-center">{t("title")}</h1>
            <p className="text-lg text-center sm:max-w-2/3 mx-auto">{t("description")}</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8 w-full sm:w-[90%] mx-auto">
                {counters.map((counter, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                        {counter.icon}
                        <span className="text-6xl font-bold text-primary">
                            <Counter
                                from={0}
                                to={counter.to}
                                animationOptions={{ duration: 0.25 }}
                                className="text-6xl font-bold text-primary"
                            />+
                        </span>
                        <p className="text-lg text-foreground/60">{counter.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
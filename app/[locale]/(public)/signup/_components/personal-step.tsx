// Lib imports
import { Path, UseFormReturn } from "react-hook-form"
import { ptBR, enUS } from "react-day-picker/locale";
import { useTranslations } from "next-intl";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

// Component imports
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { PhoneInput } from "@/components/ui/phone-input"
import { Button } from "@/components/ui/button"

// Utils imports
import { cn } from "@/lib/utils"

const DEFAULT_COUNTRY = "BR";

const calendarLocales = {
    pt: ptBR,
    en: enUS
};

export default function PersonalStep<T extends Record<string, any>>(form: UseFormReturn<T>) {
    const t = useTranslations();

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name={"name" as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John"
                                        type="text"
                                        {...field} />
                                </FormControl>

                                {form.formState.errors.name && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.name.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name={"lastName" as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sobrenome</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Doe"
                                        type="text"
                                        {...field} />
                                </FormControl>

                                {form.formState.errors.lastName && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.lastName.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

            </div>

            <FormField
                control={form.control}
                name={"cpf" as Path<T>}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="123.456.789-01"
                                type="text"
                                {...field} />
                        </FormControl>

                        {form.formState.errors.cpf && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.cpf.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={"birthDate" as Path<T>}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Selecione uma data</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    locale={calendarLocales.pt}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    captionLayout="dropdown"
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {form.formState.errors.birthDate && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.birthDate.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={"phone" as Path<T>}
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <FormLabel>Celular</FormLabel>
                        <FormControl className="w-full">
                            <PhoneInput
                                placeholder=""
                                {...field}
                                defaultCountry={DEFAULT_COUNTRY}
                            />
                        </FormControl>

                        {form.formState.errors.phone && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.phone.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />
        </>
    )
}

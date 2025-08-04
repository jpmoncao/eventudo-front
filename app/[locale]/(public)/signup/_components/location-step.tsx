import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl";
import { Path, UseFormReturn } from "react-hook-form"

export default function LocationStep<T extends Record<string, any>>(form: UseFormReturn<T>) {
    const t = useTranslations();

    return (
        <>
            <FormField
                control={form.control}
                name={"address" as Path<T>}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Endereço Completo</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Avenida Alegre, 123, Bairro Gentil"

                                type="text"
                                {...field} />
                        </FormControl>


                        {form.formState.errors.address && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.address.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name={"city" as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="São Paulo"

                                        type="text"
                                        {...field} />
                                </FormControl>

                                {form.formState.errors.city && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.city.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name={"state" as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="São Paulo"

                                        type="text"
                                        {...field} />
                                </FormControl>

                                {form.formState.errors.state && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.state.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <FormField
                control={form.control}
                name={"zipCode" as Path<T>}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="12345-678"
                                type="text"
                                {...field} />
                        </FormControl>

                        {form.formState.errors.zipCode && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.zipCode.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />
        </>
    )
}

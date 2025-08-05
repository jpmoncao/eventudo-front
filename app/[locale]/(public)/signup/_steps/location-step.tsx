import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form"
import z from "zod";
import { combinedSchema } from "../_validators/full-flow";
import { useMultiStepForm } from "../_hooks/use-stepped-form";
import NextButton from "../_components/next-button";

export default function LocationStep() {
    const t = useTranslations();

    const form = useFormContext<z.infer<typeof combinedSchema>>()

    return (
        <>
            <FormField
                control={form.control}
                name="address"
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
                        name="city"
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
                        name="state"
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
                name="zipCode"
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

import z from "zod"
import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { Input } from "@/components/ui/input"
import { combinedSchema } from "../_validators/full-flow"

export default function LoginStep() {
    const t = useTranslations();

    const form = useFormContext<z.infer<typeof combinedSchema>>()

    return (
        <>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="johndoe@gmail.com" type="email" {...field} />
                        </FormControl>
                        {form.formState.errors.email && (
                            <p className="text-destructive text-sm">{t(form.formState.errors.email.message as string)}</p>
                        )}
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>Insira uma senha forte</FormDescription>
                                {form.formState.errors.password && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.password.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>Insira a mesma senha</FormDescription>
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-destructive text-sm">{t(form.formState.errors.confirmPassword.message as string)}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    )
}

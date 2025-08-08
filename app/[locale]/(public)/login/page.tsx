'use client'

import z from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, FormProvider, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'

const loginSchema = z.object({
    email: z.string().email('pages.login.fields.email.invalid'),
    password: z.string()
        .min(8, 'pages.signup.fields.password.min')
        .nonempty('pages.signup.fields.password.required'),
})

type LoginForm = z.infer<typeof loginSchema>;

const defaultValues: DefaultValues<LoginForm> = {
    email: '',
    password: ''
}

export default function LoginPage({ locale }: { locale: string }) {
    const t = useTranslations()

    const router = useRouter();
    const searchParams = useSearchParams()

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues
    })

    const onSubmit = async (data: LoginForm) => {
        await api.post('/login', data, { withCredentials: true })
            .then((response) => {
                const { data, message } = response.data
                const id = data.id;

                toast.success(t('messages.success.' + message));

                const callbackUrl = searchParams.get('callbackUrl');
                const sucessUrl = `/${locale}/profile/${id}`;

                router.push(callbackUrl ?? sucessUrl)
            }).catch((error) => {
                console.error(error)
                switch (error.status) {
                    case 500:
                        toast.error(t('messages.errors.unexpected'))
                        break;
                    default:
                        toast.error(error.response.data.message)
                        break;
                }
            })
    }

    return (
        <section>
            <div className="space-y-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('pages.login.header.title')}</CardTitle>
                        <CardDescription>{t('pages.login.header.description')}</CardDescription>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4 max-w-[500px] mx-auto">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('pages.login.fields.email.label')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('pages.login.fields.email.placeholder')}
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {form.formState.errors.email && (
                                                <p className="text-destructive text-sm">
                                                    {t(form.formState.errors.email.message as string)}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('pages.login.fields.password.label')}</FormLabel>
                                            <FormControl>
                                                <PasswordInput placeholder={t('pages.login.fields.password.placeholder')} {...field} />
                                            </FormControl>
                                            {form.formState.errors.password && (
                                                <p className="text-destructive text-sm">
                                                    {t(form.formState.errors.password.message as string)}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <div className='flex justify-center'>
                                    <Button type='submit' className='w-1/4'>{t('pages.login.buttons.submit')}</Button>
                                </div>

                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

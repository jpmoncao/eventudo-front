'use client'

// Lib imports
import { useEffect, useState } from 'react'
import { FieldValues, useForm, UseFormReturn, Path, DefaultValues } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Component imports
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Utility imports
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface MultiStepFormProps<T extends FieldValues> {
    steps: Array<{
        key: string
        label: string
        fields: (form: UseFormReturn<T>) => React.ReactNode
        fieldNames: Array<keyof T>
        schema: z.ZodType<FieldValues, any, any>
    }>
    onComplete?: (data: T) => void
}

function buildDefaultValues<T extends Record<string, any>>(fieldNames: Array<keyof T>): DefaultValues<T> {
    return fieldNames.reduce((acc, key) => {
        (acc as T)[key] = '' as T[keyof T];
        return acc;
    }, {} as DefaultValues<T>);
}

export default function MultiStepForm<T extends FieldValues>({ steps, onComplete }: MultiStepFormProps<T>) {
    const t = useTranslations('pages.signup')

    const [step, setStep] = useState(0);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

    const currentStep = steps[step];

    const totalSteps = steps.length;

    const form = useForm<T>({
        resolver: zodResolver(currentStep.schema),
        defaultValues: buildDefaultValues<T>(
            steps.flatMap(step => step.fieldNames)
        ),
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        if (hasAttemptedSubmit) {
            form.trigger(currentStep.fieldNames as Path<T>[])
        }
    }, [step, hasAttemptedSubmit])

    const onSubmit = async (data: T) => {
        const currentFields = steps[step].fieldNames;

        setHasAttemptedSubmit(true);

        const isStepValid = await form.trigger(currentFields as Path<T>[]);

        if (!isStepValid) {
            toast.error("Por favor, preencha todos os campos obrigatórios da etapa.");
            return;
        }

        if (step < totalSteps - 1) {
            setStep((prev) => prev + 1);
            setHasAttemptedSubmit(false);
        } else {
            toast.success("Formulário enviado com sucesso!");
            onComplete?.(data);
            reset();
            setStep(0);
            setHasAttemptedSubmit(false);
        }
    }

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="space-y-4">
            {/* Indicador de progresso */}
            <div className="flex items-center justify-center">
                {steps.map((_, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={cn(
                                "w-4 h-4 rounded-full transition-all duration-300",
                                index <= step ? "bg-primary" : "bg-primary/30"
                            )}
                        />
                        {index < totalSteps - 1 && (
                            <div
                                className={cn(
                                    "w-8 h-0.5",
                                    index < step ? "bg-primary" : "bg-primary/30"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">{t('header.title')}</CardTitle>
                    <CardDescription>{t('header.description')}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                    <h1 className='text-lg font-medium mb-2'>{currentStep.label}</h1>

                    <Form {...form} key={step}>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                            {currentStep.fields(form)}

                            <div className="flex justify-between mt-4">
                                <Button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={step === 0}
                                    size="sm"
                                    className="font-medium"
                                >
                                    {t('buttons.back')}
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="font-medium"
                                >
                                    {step === totalSteps - 1 ? t('buttons.submit') : t('buttons.next')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}

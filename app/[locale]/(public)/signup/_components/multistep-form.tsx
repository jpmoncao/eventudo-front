'use client'

// Lib imports
import { SetStateAction, useEffect, useState } from 'react'
import { FieldValues, useForm, UseFormReturn, Path, DefaultValues } from 'react-hook-form'
import { toast } from 'sonner'
import z, { ZodObject } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Component imports
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Utility imports
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface MultiStepFormProps {
}

export default function MultiStepForm(props: MultiStepFormProps) {
    const t = useTranslations('pages.signup')

    const form = useForm();

    return (
        <div className="space-y-4">
            {/* Indicador de progresso */}
            <div className="flex items-center justify-center">
                {/* {steps.map((_, index) => (
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
                ))} */}
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">{t('header.title')}</CardTitle>
                    <CardDescription>{t('header.description')}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                    {/* <h1 className='text-lg font-medium mb-2'>{currentStep.label}</h1> */}

                    <Form {...form}>
                        <form onSubmit={() => { }} className="grid gap-y-4">

                            <div className="flex justify-between mt-4">
                                <Button
                                    type="button"
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
                                    {/* {step === totalSteps - 1 ? t('buttons.submit') : t('buttons.next')} */}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}

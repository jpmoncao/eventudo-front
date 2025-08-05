import { z } from 'zod'
import { createContext, useEffect, useState } from 'react'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import { FormStep, MultiStepFormContextProps, SavedFormState } from '../_types/form'
import { combinedSchema, CombinedType } from '../_validators/full-flow'
import PrevButton from './prev-button'
import NextButton from './next-button'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

export const MultiStepFormContext = createContext<MultiStepFormContextProps | null>(null)

interface IMultiStepForm {
    steps: FormStep[];
    defaultValues: DefaultValues<CombinedType>;
    onComplete?: (values: CombinedType) => Promise<void> | void;
}

const MultiStepForm = ({ steps, defaultValues, onComplete }: IMultiStepForm) => {
    const t = useTranslations('pages.signup')

    const methods = useForm<z.infer<typeof combinedSchema>>({
        resolver: zodResolver(combinedSchema),
        defaultValues
    })

    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const currentStep = steps[currentStepIndex]

    const [savedFormState, setSavedFormState] = useState<SavedFormState | null>(null);

    // Restore form state from LS
    useEffect(() => {
        if (savedFormState) {
            setCurrentStepIndex(savedFormState.currentStepIndex)
            methods.reset(savedFormState.formValues)
        }
    }, [methods, savedFormState])

    const saveFormState = (stepIndex: number) => {
        const formValues = methods.getValues()

        setSavedFormState({
            currentStepIndex: stepIndex ?? currentStepIndex,
            formValues,
        })
    }

    const clearFormState = () => {
        setSavedFormState(null)
        setCurrentStepIndex(0)
        methods.reset()
    }

    const nextStep = async () => {
        const isValid = await methods.trigger(currentStep.fields)

        if (!isValid) {
            return
        }

        // grab values in current step and transform values to object
        const currentStepValues = methods.getValues(currentStep.fields)
        const formValues = Object.fromEntries(
            currentStep.fields.map((field, index) => [
                field,
                currentStepValues[index] || '',
            ])
        )

        // validate form values against schema and set errors
        if (currentStep.validationSchema) {
            const validationResult =
                currentStep.validationSchema.safeParse(formValues)

            if (!validationResult.success) {
                validationResult.error.issues.forEach((err) => {
                    methods.setError(err.path.join('.') as keyof CombinedType, {
                        type: 'manual',
                        message: err.message,
                    })
                })
                return
            }
        }

        if (currentStepIndex < steps.length - 1) {
            saveFormState(currentStepIndex + 1)
            setCurrentStepIndex(currentStepIndex + 1)
        } else {
            saveFormState(currentStepIndex)
            await methods.handleSubmit(submitSteppedForm)()
        }
    }

    const previousStep = () => {
        if (currentStepIndex > 0) {
            saveFormState(currentStepIndex - 1)
            setCurrentStepIndex(currentStepIndex - 1)
        }
    }

    const goToStep = (position: number) => {
        if (position >= 0 && position - 1 < steps.length) {
            saveFormState(position - 1)
            setCurrentStepIndex(position - 1)
        }
    }

    async function submitSteppedForm(data: z.infer<typeof combinedSchema>) {
        try {
            // Perform your form submission logic here
            await onComplete?.(data);

            clearFormState();
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }

    const value: MultiStepFormContextProps = {
        currentStep: steps[currentStepIndex],
        currentStepIndex,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goToStep,
        nextStep,
        previousStep,
        steps,
    }

    return (
        <MultiStepFormContext.Provider value={value}>
            <div className="space-y-4">
                <div className="flex items-center justify-center">
                    {steps.map((_, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={cn(
                                    "w-4 h-4 rounded-full transition-all duration-300",
                                    index <= currentStepIndex ? "bg-primary" : "bg-primary/30"
                                )}
                            />
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "w-8 h-0.5",
                                        index < currentStepIndex ? "bg-primary" : "bg-primary/30"
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
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(submitSteppedForm)} className="grid gap-y-4">
                                <h1 className='pt-5 text-xl font-bold'>{currentStep.title}</h1>

                                {currentStep.component}

                                <div className="flex justify-between mt-4">
                                    <PrevButton text={t('buttons.back')} />
                                    <NextButton text={currentStepIndex === steps.length - 1 ? t('buttons.submit') : t('buttons.next')} />
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </MultiStepFormContext.Provider >
    )
}

export default MultiStepForm
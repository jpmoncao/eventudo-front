'use client'

import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

import MultiStepForm from './_components/multistep-form'
import LoginStep from './_components/login-step'
import PersonalStep from './_components/personal-step'
import LocationStep from './_components/location-step'

import { loginSchema, LoginFormData } from './_validators/login'
import { personalSchema, PersonalFormData } from './_validators/personal'
import { locationSchema, LocationFormData } from './_validators/location'

const signupSchema = loginSchema.merge(personalSchema).merge(locationSchema);
type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
    const t = useTranslations('pages.signup');

    const steps = [
        {
            key: "step1",
            label: t('step1.label'),
            fields: (form: UseFormReturn<SignupFormData>) => LoginStep(form),
            fieldNames: ['email', 'password', 'confirmPassword'] as (keyof LoginFormData)[],
            schema: loginSchema
        },
        {
            key: "step2",
            label: t('step2.label'),
            fields: (form: UseFormReturn<SignupFormData>) => PersonalStep(form),
            fieldNames: ['name', 'lastName', 'cpf', 'birthDate', 'phone'] as (keyof PersonalFormData)[],
            schema: personalSchema
        },
        {
            key: "step3",
            label: t('step3.label'),
            fields: (form: UseFormReturn<SignupFormData>) => LocationStep(form),
            fieldNames: ['address', 'city', 'state', 'zipCode'] as (keyof LocationFormData)[],
            schema: locationSchema
        }
    ]

    return (
        <section>
            <MultiStepForm<SignupFormData>
                steps={steps}
                onComplete={(data) => console.log("Form data:", data)}
            />
        </section>
    )
}

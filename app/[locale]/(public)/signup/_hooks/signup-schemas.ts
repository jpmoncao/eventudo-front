'use client'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const useSignupSchemas = () => {
    const t = useTranslations('pages.signup.fields')

   

    return {
        loginSchema,
        personalSchema,
        locationSchema,
        signupSchema: loginSchema.merge(personalSchema).merge(locationSchema),
    }
}

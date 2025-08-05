'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

import MultiStepForm from './_components/stepped-form'
import LoginStep from './_steps/login-step'
import PersonalStep from './_steps/personal-step'
import LocationStep from './_steps/location-step'

import { loginSchema } from './_validators/login'
import { personalSchema } from './_validators/personal'
import { locationSchema } from './_validators/location'

import { FormStep } from './_types/form'
import { CombinedType } from './_validators/full-flow'

export default function SignupPage() {
    const t = useTranslations();

    const saveUser = async (data: CombinedType) => {
        const userData: Partial<CombinedType> = data;

        delete userData.confirmPassword;

        const res = await api
            .post('signup/', userData)
            .then(function (response) {
                toast.success('Usuário cadastrado com sucesso!', {
                    description: t('messages.success.' + response.data.message)
                })
            })
            .catch(function (error) {
                console.error(error)
                switch (error.status) {
                    case 500:
                        toast.error('Erro inesperado no servidor!')
                        break;
                    default:
                        toast.error('Erro ao cadastrar usuário!', { description: error.response.data.message })
                        break;
                }
            });
    }

    const steps: FormStep[] = [{
        title: t('pages.signup.step1.label'),
        component: <LoginStep />,
        position: 1,
        validationSchema: loginSchema,
        fields: ['email', 'password', 'confirmPassword'],
    },
    {
        title: t('pages.signup.step2.label'),
        component: <PersonalStep />,
        position: 2,
        validationSchema: personalSchema,
        fields: ['name', 'lastName', 'cpf', 'birthDate', 'phone'],
    },
    {
        title: t('pages.signup.step3.label'),
        component: <LocationStep />,
        position: 3,
        validationSchema: locationSchema,
        fields: ['address', 'city', 'state', 'zipCode'],
    }]

    const defaultValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastName: '',
        cpf: '',
        birthDate: undefined,
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    }

    return (
        <section>
            <MultiStepForm
                steps={steps}
                defaultValues={defaultValues}
                onComplete={saveUser} />
        </section>
    )
}

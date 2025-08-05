import { z } from "zod"

export const personalSchema = z.object({
    name: z.string().nonempty('pages.signup.fields.name.required'),
    lastName: z.string().nonempty('pages.signup.fields.lastName.required'),
    cpf: z.string().min(11, 'pages.signup.fields.cpf.min'),
    phone: z.string().min(8, 'pages.signup.fields.phone.min'),
    birthDate: z.date('pages.signup.fields.birthDate.required')
        .refine(date => !isNaN(date.getTime()), {
            message: 'pages.signup.fields.birthDate.invalid',
        }),
})

export type PersonalFormData = z.infer<typeof personalSchema>

import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('pages.signup.fields.email.invalid'),
    password: z.string()
        .min(6, 'pages.signup.fields.password.min')
        .nonempty('pages.signup.fields.password.required'),
    confirmPassword: z.string()
        .min(6, 'pages.signup.fields.confirmPassword.min')
        .nonempty('pages.signup.fields.confirmPassword.required'),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ['confirmPassword'],
            code: 'custom',
            message: 'pages.signup.fields.confirmPassword.mismatch',
        })
    }
})

export type LoginFormData = z.infer<typeof loginSchema>
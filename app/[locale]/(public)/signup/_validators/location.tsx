import { z } from "zod"

export const locationSchema = z.object({
    address: z.string().nonempty('pages.signup.fields.address.required'),
    city: z.string().nonempty('pages.signup.fields.city.required'),
    state: z.string().nonempty('pages.signup.fields.state.required'),
    zipCode: z.string().min(8, 'pages.signup.fields.zipCode.min'),
})

export type LocationFormData = z.infer<typeof locationSchema>

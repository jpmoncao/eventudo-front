import z from "zod";

import { locationSchema } from "./location";
import { loginSchema } from "./login";
import { personalSchema } from "./personal";

export const combinedSchema = loginSchema
    .merge(personalSchema)
    .merge(locationSchema);

export type CombinedType = z.infer<typeof combinedSchema>
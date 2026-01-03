import type { sendAuthCodeSchema, signupSchema } from "@/lib/validations";
import { Infer } from "zod";

type SignupSchemaType = Infer<ReturnType<typeof signupSchema>>;
type SendAuthCodeSchemaType = Infer<ReturnType<typeof sendAuthCodeSchema>>;
export type { SignupSchemaType , SendAuthCodeSchemaType};

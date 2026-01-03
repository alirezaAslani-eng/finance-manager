import type { verifyPhoneSchema } from "@/lib/validations";
import type { Infer } from "zod";

type VerifyPhoneSchemaType = Infer<ReturnType<typeof verifyPhoneSchema>>;

export type { VerifyPhoneSchemaType };

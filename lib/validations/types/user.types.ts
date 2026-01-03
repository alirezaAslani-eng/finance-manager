import type { editUserSchema, setupUserSchema } from "@/lib/validations";
import type { Infer } from "zod";

type SetupUserSchemaType = Infer<ReturnType<typeof setupUserSchema>>;
type EditUserSchemaType = Infer<ReturnType<typeof editUserSchema>>;

export type { SetupUserSchemaType, EditUserSchemaType };

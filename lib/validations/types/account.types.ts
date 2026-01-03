import type { Infer } from "zod";
import type {
  createAccountSchema,
  activeAccountSchema,
} from "@/lib/validations";

type CreateAccountSchemaType = Infer<ReturnType<typeof createAccountSchema>>;
type ActiveAccountSchemaType = Infer<ReturnType<typeof activeAccountSchema>>;

export type { CreateAccountSchemaType, ActiveAccountSchemaType };

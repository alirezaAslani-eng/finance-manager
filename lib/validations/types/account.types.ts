import type { Infer } from "zod";
import type {
  createAccountSchema,
  activeAccountSchema,
  editAccountSchema,
} from "@/lib/validations";

type CreateAccountSchemaType = Infer<ReturnType<typeof createAccountSchema>>;
type EditAccountSchemaType = Infer<ReturnType<typeof editAccountSchema>>;
type ActiveAccountSchemaType = Infer<ReturnType<typeof activeAccountSchema>>;

export type {
  CreateAccountSchemaType,
  ActiveAccountSchemaType,
  EditAccountSchemaType,
};

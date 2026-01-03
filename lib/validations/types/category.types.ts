import type { Infer } from "zod";
import type {
  editCategorySchema,
  createCategorySchema,
} from "@/lib/validations";

type CreateCategorySchemaType = Infer<ReturnType<typeof createCategorySchema>>;
type EditCategorySchemaType = Infer<ReturnType<typeof editCategorySchema>>;

export type { CreateCategorySchemaType, EditCategorySchemaType };

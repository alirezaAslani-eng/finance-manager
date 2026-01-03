import { Infer } from "zod";
import type {
  createTransactionSchema,
  editTransactionSchema,
  filterTransactionSchema,
} from "@/lib/validations";

type CreateTransactionSchemaType = Infer<
  ReturnType<typeof createTransactionSchema>
>;
type EditTransactionSchemaType = Infer<
  ReturnType<typeof editTransactionSchema>
>;
type FilterTransactionSchemaType = Infer<
  ReturnType<typeof filterTransactionSchema>
>;

export type {
  CreateTransactionSchemaType,
  EditTransactionSchemaType,
  FilterTransactionSchemaType,
};

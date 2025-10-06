import { object } from "zod";
import type { Infer } from "zod";
import accountSchema from "./accountSchema";
import categorySchema from "./categorySchema";

const initSchema = object({
  accountName: accountSchema.shape.accountName,
  currentBalance: accountSchema.shape.currentBalance,
  cardNumber: accountSchema.shape.cardNumber,
  categoryName: categorySchema.shape.name,
});
type InitSchemaType = Infer<typeof initSchema>;
export type { InitSchemaType };
export default initSchema;

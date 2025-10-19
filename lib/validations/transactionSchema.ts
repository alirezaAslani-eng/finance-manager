import { number, object, string, enum as enum_ } from "zod";
import type { Infer } from "zod";

const transactionSchema = object({
  amount: number().min(0, "مقدار تراکنش حداقل 0 میتوانه باشه"),
  reason: string("لطفا فیلد را پر کنید")
    .min(3, "حد اقل 3 حرف")
    .max(500, "حد اکثر 500 حرف"),
  type: enum_(["0", "1"]),
  account: string().nonempty("تراکنش برای کدوم کارت بانکی هست"),
  category: string().nonempty("تراکنش برای کدام دسته بندی هست"),
});

const transactionEditSchema = transactionSchema.pick({
  category: true,
  reason: true,
  account: true,
  amount: true,
  type: true,
});

//  * Schema Type ================ >
type transactionSchemaType = Infer<typeof transactionSchema>;
type transactionEditSchemaType = Infer<typeof transactionEditSchema>;
export type { transactionSchemaType, transactionEditSchemaType };
// * Schema ========== >
export { transactionSchema, transactionEditSchema };

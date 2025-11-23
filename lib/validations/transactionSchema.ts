import { identifyDate } from "@/utils";
import {
  number,
  object,
  string,
  enum as enum_,
  array,
  date,
  literal,
  preprocess,
} from "zod";
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
  amount: true,
  type: true,
});

const filterSchema = object({
  accounts: array(string()),
  categories: array(string()),
  fromDate: preprocess((val) => identifyDate(val), date().nullable()),
  toDate: preprocess((val) => identifyDate(val), date().nullable()),
  maxAmount: number().nullable(),
  minAmount: number().nullable(),
  type: enum_(["0", "1"]).nullable(),
  old: literal(true).nullable(),
});

type FilterSchemaType = Infer<typeof filterSchema>;
//  * Schema Type ================ >
type transactionSchemaType = Infer<typeof transactionSchema>;
type transactionEditSchemaType = Infer<typeof transactionEditSchema>;
export type {
  transactionSchemaType,
  transactionEditSchemaType,
  FilterSchemaType,
};
// * Schema ========== >
export { transactionSchema, transactionEditSchema, filterSchema };

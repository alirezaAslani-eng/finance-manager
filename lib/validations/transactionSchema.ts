import { Transaction_face } from "@/types/transaction.types";
import { Test_type } from "@/types/utils";
import z from "zod";

const transactionSchema = z.object({
  amount: z
    .string("لطفا فیلد را پر کنید")
    .regex(/^[0-9]+$/, "مقدار معتبر نیست"),
  reason: z
    .string("لطفا فیلد را پر کنید")
    .min(3, "حد اقل 3 حرف")
    .max(500, "حد اکثر 500 حرف"),
});

type Test_schema = Test_type<
  z.infer<typeof transactionSchema>,
  Pick<Transaction_face, "amount" | "reason">
>;
export default transactionSchema;

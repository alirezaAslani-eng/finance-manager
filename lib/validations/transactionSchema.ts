import { Transaction_face } from "@/types/transaction.types";
import { Test_type } from "@/types/utils";
import z from "zod";

const transactionSchema = z.object({
  // TODO -> amount must be number
  amount: z
    .string("مبلغ تراکنش را وارد کنید")
    .regex(/^[0-9]+$/, "مقدار تراکنش معتبر نیست"),
  reason: z
    .string("لطفا فیلد را پر کنید")
    .min(3, "حد اقل 3 حرف")
    .max(500, "حد اکثر 500 حرف"),
  type: z.enum(["0", "1"]),
});

type Test_schema = Test_type<
  Pick<Transaction_face, "amount" | "reason" | "type">,
  z.infer<typeof transactionSchema>
>;
export default transactionSchema;

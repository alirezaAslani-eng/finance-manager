import { object, Infer, string, number } from "zod";

const accountSchema = object({
  accountName: string()
    .min(3, "نام حساب بانکی شما کوتاه است")
    .max(20, "برای نام حساب حداکثر 20 حرف مجاز هست"),
  cardNumber: string().regex(/^[0-9]{16}$/, "شماره کارت نا معتبر هست"),
  currentBalance: number().min(0, "مقدار حداقل 0 میتونه باشه"),
});

export default accountSchema;

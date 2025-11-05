import { object, Infer, string, number, preprocess } from "zod";

const accountSchema = object({
  accountName: string()
    .min(3, "نام حساب بانکی شما کوتاه است")
    .max(20, "برای نام حساب حداکثر 20 حرف مجاز هست"),
  cardNumber: preprocess(
    (val: string) => val.split("-").join(""),
    string().regex(/^[0-9]{16}$/, "شماره کارت نا معتبر هست")
  ),
  currentBalance: number().min(0, "مقدار حداقل 0 میتونه باشه"),
});
const activeAccountSchema = object({
  _id: string("لطفا شناسه حسابی که میخواهید فعال کنید بدهید"),
});

type AccountSchemaType = Infer<typeof accountSchema>;
type ActiveAccountSchemaType = Infer<typeof activeAccountSchema>;

export type { AccountSchemaType, ActiveAccountSchemaType };
export { accountSchema, activeAccountSchema };

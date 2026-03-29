import { number, object, preprocess, string } from "zod";

const createAccountSchema = () => {
  return object({
    accountName: string()
      .min(3, "نام حساب بانکی شما کوتاه است")
      .max(20, "برای نام حساب حداکثر 20 حرف مجاز هست"),
    cardNumber: preprocess(
      (val: string): string =>
        typeof val !== "string" ? "" : val.split("-").join(""),
      string(" ").regex(/^[0-9]{16}$/, "شماره کارت نا معتبر هست"),
    ),
    currentBalance: number(" ").min(1, " "),
  });
};

export default createAccountSchema;

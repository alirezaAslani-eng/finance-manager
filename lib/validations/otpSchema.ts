import { OtpType_enum } from "@/types/opt.types";
import { object, string, enum as enum_ } from "zod";

const sendCodeSchema = object({
  phone: string().regex(/^09[0-9]{9}$/, "شماره نامعتبر هست"),
  type: enum_(["signin", "signup"] as (keyof typeof OtpType_enum)[]),
});
const verifySchema = object({
  phone: string().regex(/^09[0-9]{9}$/, "شماره نامعتبر هست"),
  otpCode: string().min(5, "کد را کامل وارد کنید").max(5, "کد باید ۵ رقم باشه"),
});

export { verifySchema, sendCodeSchema };

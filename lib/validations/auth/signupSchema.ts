import { object, string } from "zod";
import verifyPhoneSchema from "../otp/verifyPhoneSchema";

const signupSchema = () => {
  return object({
    userName: string()
      .min(5, "حد اقل 5 حرف")
      .max(30, "حد اکثر 30 حرف")
      .regex(/^[A-Za-zآ-ی0-9_.]+$/, "نام کاربری نا معتبر"),
    fullName: string().min(5, "حد اقل 5 حرف").max(30, "حد اکثر 30 حرف"),
    password: string()
      .min(6, "حد اقل شامل 6 حرف")
      .regex(/^[A-Za-z0-9]+$/, "رمز عبور باید شامل حروف و اعداد انگلیسی باشد"),
    phone: string().regex(/^09[0-9]{9}$/, "شماره نامعتبر هست"),
    email: string()
      .nonempty("فیلد نباید خالی باشه")
      .regex(/^[A-Za-z0-9._%+-]+@gmail\.com$/, "ایمیل معتبر نیست"),
    otpCode: verifyPhoneSchema().shape.otpCode,
  });
};

export default signupSchema;

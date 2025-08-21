import { object, string, Infer } from "zod";
import { User_face } from "@/types/user.types";
const userSchema = object({
  userName: string()
    .min(5, "حد اقل 5 حرف")
    .max(30, "حد اکثر 30 حرف")
    .regex(/^[A-Za-zآ-ی0-9_.]+$/, "نام کاربری نا معتبر"),
  fullName: string()
    .min(5, "حد اقل 5 حرف")
    .max(30, "حد اکثر 30 حرف")
    .regex(/^[A-Za-zآ-ی]+$/, "نام کاربری نا معتبر"),
  password: string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, "رمز نا معتبر"),
  phone: string()
    .min(11, "شماره 11 رقم نیست")
    .regex(/^09[0-9]{9}$/, "شماره نامعتبر هست"),
});

// * Check Validation Type ================ >
type Test = Infer<typeof userSchema> extends Pick<
  User_face,
  "fullName" | "password" | "phone" | "userName"
>
  ? true
  : false;
export default userSchema;

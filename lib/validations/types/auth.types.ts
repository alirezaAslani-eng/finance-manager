import type {
  sendAuthCodeSchema,
  signupSchema,
  checkSignupInfoSchema,
} from "@/lib/validations";
import { Infer } from "zod";

type SignupSchemaType = Infer<ReturnType<typeof signupSchema>>;
type CheckSignupInfoSchemaType = Infer<
  ReturnType<typeof checkSignupInfoSchema>
>;
type SendAuthCodeSchemaType = Infer<ReturnType<typeof sendAuthCodeSchema>>;
export type {
  SignupSchemaType,
  SendAuthCodeSchemaType,
  CheckSignupInfoSchemaType,
};

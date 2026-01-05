import { otp_schema, user_schema } from "@/server/models";
import { GetMeOutput } from "@/types/user.types";
import { InferSchemaType } from "mongoose";

interface OTP extends InferSchemaType<typeof otp_schema> {}
interface AuthOTPOptions {
  type?: "signin" | "signup";
}
type UserModelSchema = InferSchemaType<typeof user_schema>;

// * getUserInfo.ts
type GetUserInfo = (token: string | undefined) => Promise<GetMeOutput | false>;

// * registerUser.ts
interface UserInfo extends UserModelSchema {
  otpCode: string;
}
interface RegisterUser_Output extends Omit<UserModelSchema, "password"> {
  _id: string;
}
type RegisterUser = (userInfo: UserInfo) => Promise<RegisterUser_Output>;

// * requestAuthOTP.ts
interface RequestAuthOTP_Props extends Pick<AuthOTPOptions, "type"> {
  phone: string;
}
type RequestAuthOTP = (props: RequestAuthOTP_Props) => Promise<number>;
// * verifyAuthOTP.ts
interface VerifyAuthOTP_Props extends Pick<AuthOTPOptions, "type"> {
  phone: string;
  otpCode: string;
}
interface VerifyAuthOTP_Output
  extends Omit<InferSchemaType<typeof user_schema>, "password"> {
  _id: string;
}
type VerifyAuthOTP = (
  props: VerifyAuthOTP_Props
) => Promise<VerifyAuthOTP_Output>;

export type {
  OTP,
  // * requestAuthOTP.ts
  RequestAuthOTP,
  // * verifyAuthOTP.ts
  VerifyAuthOTP,
  VerifyAuthOTP_Output,
  // * registerUser.ts
  RegisterUser,
  RegisterUser_Output,
  // * getUserInfo.ts
  GetUserInfo,
};

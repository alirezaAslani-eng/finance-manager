import { SendAuthCodeSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { OtpGoodResponse_face } from "@/types/opt.types";
import type { MutateOptions } from "@tanstack/react-query";

type MutateOptionsType = Pick<
  MutateOptions<OtpGoodResponse_face, BadResponse_face, SendAuthCodeSchemaType>,
  "onError" | "onSuccess"
>;
interface Config extends MutateOptionsType {
  type: "signin" | "signup";
  phone: string;
  init?: boolean;
}
interface UseSendAuthVerifyCodeOutput {
  reqAuthOTP(): void;
  isRequestingOtp: boolean;
  isOverRequestTime: boolean;
  requestTime: string;
}
type UseSendAuthVerifyCode = (options: Config) => UseSendAuthVerifyCodeOutput;

export type { UseSendAuthVerifyCode };

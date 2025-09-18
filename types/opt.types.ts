enum OtpType_enum {
  "signin" = "signin",
  "signup" = "signup",
}
interface Otp_face {
  type: keyof typeof OtpType_enum;
  phone: string;
  otpCode: string;
  expTime: number; // new Date().getTime()
  limitWait: number; // new Date().getTime()
  attempts: number;
  requestCount: number;
  blockTime: number | null;
}
interface VerifyOption {
  type?: keyof typeof OtpType_enum;
}
interface OtpRequestSeting {
  type?: keyof typeof OtpType_enum;
}
interface OtpGoodResponse_face {
  message: string;
  phone: string;
  limitWait: number;
}

export type { Otp_face, OtpGoodResponse_face, VerifyOption, OtpRequestSeting };
// value
export { OtpType_enum };

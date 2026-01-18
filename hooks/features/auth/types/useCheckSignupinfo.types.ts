import { SignupSchemaType } from "@/lib/validations/types";

interface UseCheckSignupInfoOutput {
  checkInfo(info: Omit<SignupSchemaType, "otpCode">): Promise<void>;
  isChecking: boolean;
  isSuccessCheck: boolean;
}

type UseCheckSignupInfo = () => UseCheckSignupInfoOutput;

export type { UseCheckSignupInfo, UseCheckSignupInfoOutput };

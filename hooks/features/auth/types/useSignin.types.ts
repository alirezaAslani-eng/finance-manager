import { VerifyPhoneSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { MutateOptions } from "@tanstack/react-query";

interface Options
  extends Pick<
    MutateOptions<void, BadResponse_face, VerifyPhoneSchemaType>,
    "onError" | "onSuccess"
  > {}

interface UseSigninOutput {
  isSigninig: boolean;
  signin(signinInfo: VerifyPhoneSchemaType): void;
  isSuccessSignin: boolean;
  isErrorSignin: boolean;
}
type UseSignin = (options?: Options) => UseSigninOutput;

export type { UseSignin, UseSigninOutput };

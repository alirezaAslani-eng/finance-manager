import { signinUser } from "@/api";
import { VerifyPhoneSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { UseSignin, UseSigninOutput } from "./types";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/context";

const useSignin: UseSignin = ({ onError, onSuccess } = {}) => {
  const { replace } = useRouter();
  const { refetchMe } = useAuth();
  const {
    mutate: verify,
    isPending: isSigninig,
    isSuccess: isSuccessSignin,
    isError: isErrorSignin,
  } = useMutation<void, BadResponse_face, VerifyPhoneSchemaType>({
    mutationFn: signinUser,
    onSuccess(res, vars, context) {
      refetchMe();
      if (onSuccess) {
        onSuccess(res, vars, context);
        return;
      }
      // * default onSuccess behavior
      // Todo Show Error Message
      replace("/my-panel");
    },
    onError(res, vars, context) {
      if (onError) {
        onError(res, vars, context);
        return;
      }
      // * default onSuccess behavior
      // Todo Show Error Message
    },
  });

  const signin: UseSigninOutput["signin"] = useCallback(
    ({ otpCode, phone }) => {
      verify({ phone, otpCode });
    },
    [verify]
  );
  return useMemo(
    () => ({ signin, isSigninig, isSuccessSignin, isErrorSignin }),
    [signin, isSigninig, isSuccessSignin, isErrorSignin]
  );
};

export default useSignin;

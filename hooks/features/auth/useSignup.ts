import { signupUser } from "@/api";
import { SignupContext } from "@/context";
import { keyUserInfo } from "@/packages/react-query";
import { BadResponse_face } from "@/types/error.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";

function useSignup() {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending: isSgininup,
    isSuccess: isSuccessSignup,
    isError: isErrorSignup,
  } = useMutation({ mutationFn: signupUser });

  const { signupInfo, removeSignupCache } = useContext(SignupContext);

  const signup = useCallback(
    async (otpCode: string) => {
      try {
        await mutateAsync({ otpCode, ...signupInfo! });
        await queryClient.prefetchQuery({ queryKey: keyUserInfo.all });
        removeSignupCache();
        replace("/my-panel");
      } catch (err) {
        const error = err as BadResponse_face;
        if (error.type == "verify" || error.type == "client") {
          // TODO show Error to user ==================== >
          console.log("error in verify state =>", error);
        }
      }
    },
    [signupInfo, queryClient, replace]
  );
  return { signup, signupInfo, isSuccessSignup, isSgininup, isErrorSignup };
}

export default useSignup;

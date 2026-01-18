import { checkSignupInfo } from "@/api";
import { SignupContext } from "@/context";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UseCheckSignupInfo, UseCheckSignupInfoOutput } from "./types";

const useCheckSignupInfo: UseCheckSignupInfo = () => {
  const { push } = useRouter();
  const { cacheSignupInfo } = useContext(SignupContext);
  const {
    mutateAsync,
    isPending: isChecking,
    isSuccess: isSuccessCheck,
  } = useMutation({
    mutationFn: checkSignupInfo,
  });

  const checkInfo: UseCheckSignupInfoOutput["checkInfo"] = async (info) => {
    const { email, userName, phone } = info;
    try {
      await mutateAsync({ email, phone, userName });
      cacheSignupInfo(info); // * it will be used in "/auth/signup",
      push("/auth/verify-signup");
    } catch (err) {
      const error = err as BadResponse_face;
      //  todo show error message
    }
  };

  return { checkInfo, isChecking, isSuccessCheck };
};

export default useCheckSignupInfo;

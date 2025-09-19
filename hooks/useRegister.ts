import { postOneUser } from "@/api/post";
import { keys, queryClient } from "@/config/react-query";
import { AuthContex, SignupContext } from "@/context";
import { BadResponse } from "@/lib/utils";
import { userSchema, verifySchema } from "@/lib/validations";
import { SignupResponse_type } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Infer } from "zod";

function useRegister() {
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  // * router hook ======================== >
  const { replace } = useRouter();

  // * Signup Context to set userInfo because user need to verify phone number after they verify we use Provided data from AuthContext and Register user
  const { cacheSignupInfo, signupInfo } = useContext(SignupContext);
  const { setInfo } = useContext(AuthContex)!;

  // * Mutation to create a user ===================== >
  const { mutateAsync } = useMutation({ mutationFn: postOneUser });

  // * Request to check info for Signup User ======================= >
  const checkSignupInfo = async (formInfo: Infer<typeof userSchema>) => {
    try {
      await mutateAsync(formInfo);
    } catch (err) {
      const error = err as BadResponse;

      // * if the error is from verify: cache user's info and change state to show verify form ========= >
      if (error.type == "verify") {
        const { email, fullName, password, userName, phone } = formInfo;
        cacheSignupInfo({ email, fullName, password, phone, userName }); // * cache user's signup info <<<
        setIsSuccessRegister(true); // * Show Verify form <<<<<
        setInfo({ phone }); // * save phone state for otp request <<<
      }

      // * Error from user's info might be conflict or ... ================== >
      if (error.type == "client") {
        // todo Show Error to user ============ >
        console.log(error);
        return;
      }
    }
  };
  // * Request to verify and create user ================== >
  const verifyUser = async (formInfo: Infer<typeof verifySchema>) => {
    try {
      await mutateAsync({ otpCode: formInfo.otpCode, ...signupInfo! });
      replace("/");
    } catch (err) {
      const error = err as BadResponse;
      if (error.type == "verify" || error.type == "client") {
        // TODO show Error to user ==================== >
        console.log("error in verify state =>", error);
      }
    }
  };
  return { verifyUser, checkSignupInfo, isSuccessRegister, signupInfo };
}

export default useRegister;

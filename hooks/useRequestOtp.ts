import { postVerifySMS } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { sendCodeSchema } from "@/lib/validations";
import { Infer } from "zod";
import { useRouter } from "next/router";
import { AuthContex } from "@/context";
import { OtpGoodResponse_face } from "@/types/opt.types";
import type { BadResponse } from "@/lib/utils";

function useRequestOtp() {
  const { mutateAsync } = useMutation({ mutationFn: postVerifySMS });
  const { replace } = useRouter();

  // * AuthContext to add user phone because we need it at this path "/auth/verify-signin?waite=n"
  const { setInfo } = useContext(AuthContex);

  const requestOtp = async (requestInfo: Infer<typeof sendCodeSchema>) => {
    try {
      const res = (await mutateAsync({
        phone: requestInfo.phone,
      })) as OtpGoodResponse_face;
      setInfo({ phone: requestInfo.phone });
      // * navigate user with a query which is needed for state of the time that user shoud waite to next otp requset =============== >
      replace(`/auth/verify-signin?wait=${res.limitWait}`);
      // TODO -> show success message <<<<<<<<
      console.log(res.message);
    } catch (err) {
      const error = err as BadResponse;
      // * Navigate user to verify page and show error (for better ux)
      replace(
        `/auth/verify-signin?wait=${
          typeof error.message == "number" ? error.message : 0
        }`
      );
      // TODO -> show Error message <<<<<<<<
      console.log(error);
    }
  };

  return requestOtp;
}

export default useRequestOtp;

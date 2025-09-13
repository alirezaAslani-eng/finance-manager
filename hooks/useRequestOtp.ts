import { postVerifySMS } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import type { OtpGoodResponse_face } from "@/types/opt.types";
import type { BadResponse } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "@/context";

interface Options {
  init?: boolean;
}
function useRequestOtp({ init = true }: Options = {}) {
  // * this state includes a ms time from future and user shoud wait until that  ================= >
  const [otpWaitTime, setOtpWaitTime] = useState<number>(0);

  const {
    userInfo: { phone },
  } = useContext(AuthContex);

  const { mutateAsync, isPending: isRequesting } = useMutation({
    mutationFn: postVerifySMS,
  });

  const requestOtp = async (phone: string): Promise<number> => {
    try {
      const res = (await mutateAsync({ phone })) as OtpGoodResponse_face;
      //  TODO show Success Message <<<<<<<
      const waitTime = res.limitWait;

      // * save waitTime user may refresh the page =============== >
      localStorage.setItem("otpWaitTime", String(waitTime));

      // * return limitTime ================== >
      return waitTime;
    } catch (err) {
      const error = err as BadResponse;
      console.log(error);
      return 0;
      // TODO -> show Error message <<<<<<<<
    }
  };

  // * Initialize otp request ============== >
  const now = new Date().getTime();
  const savedWaitTime: number =
    Number(localStorage.getItem("otpWaitTime")) || 0;
  useEffect(() => {
    if (!init) return;
    if (now < savedWaitTime) {
      setOtpWaitTime(savedWaitTime);
    } else {
      // * it needs phone number from context when verify form get mounted and user can request for otp
      requestOtp(phone);
    }
  }, [phone]);

  return { requestOtp, isRequesting, otpWaitTime };
}

export default useRequestOtp;

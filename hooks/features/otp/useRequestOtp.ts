import { postVerifySMS } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import type { OtpGoodResponse_face, OtpType_enum } from "@/types/opt.types";
import type { BadResponse } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from "@/context";

interface Options {
  init?: boolean;
}
function useRequestOtp(
  type: keyof typeof OtpType_enum = "signin",
  { init = true }: Options = {}
) {
  // * this state includes a ms time from future and user shoud wait until that  ================= >
  const [otpWaitTime, setOtpWaitTime] = useState<number>(0);

  const {
    userInfo: { phone },
  } = useAuth();

  const { mutateAsync, isPending: isRequesting } = useMutation({
    mutationFn: postVerifySMS,
  });

  const requestOtp = async (userPhone: string): Promise<number> => {
    try {
      const res = (await mutateAsync({
        phone: userPhone,
        type,
      })) as OtpGoodResponse_face;
      //  TODO show Success Message <<<<<<<
      const waitTime = res.limitWait;
      setOtpWaitTime(waitTime);

      // * return limitTime ================== >
      return waitTime;
    } catch (err) {
      const error = err as BadResponse;
      if ((error.statusCode = 429)) {
        setOtpWaitTime(Number(error.message) || 0);
      }
      console.log(error);
      return 0;
      // TODO -> show Error message <<<<<<<<
    }
  };

  // * Initialize otp request ============== >
  const initialize = async () => {
    // * it needs phone number from context when verify form get mounted and user can request for otp
    const waitTime = await requestOtp(phone);
    setOtpWaitTime(waitTime);
  };
  useEffect(() => {
    if (!init) return;
    initialize();
  }, [phone]);

  return { requestOtp, isRequesting, otpWaitTime };
}

export default useRequestOtp;

import { sendAuthSMS } from "@/api";
import { useMutation } from "@tanstack/react-query";
import type { OtpGoodResponse_face } from "@/types/opt.types";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context";
import { BadResponse_face } from "@/types/error.types";
import { SendAuthCodeSchemaType } from "@/lib/validations/types";
import { UseSendAuthVerifyCode } from "./types";
import useReamingTime from "@/hooks/app/useReamingTime";

const useSendAuthVerifyCode: UseSendAuthVerifyCode = ({
  phone,
  type,
  init = false,
  onError = () => {},
  onSuccess = () => {},
}) => {
  const [waitUntilAsMs, setWaitUntilAsMs] = useState<number>(0);

  const { semanticFormat: requestTime, isFnished: isOverRequestTime } =
    useReamingTime(waitUntilAsMs);

  const { mutate: reqOTP, isPending: isRequestingOtp } = useMutation<
    OtpGoodResponse_face,
    BadResponse_face,
    SendAuthCodeSchemaType
  >({
    mutationFn: sendAuthSMS,
    onSuccess(res, vars, context) {
      onSuccess(res, vars, context);
      const reponse = res as OtpGoodResponse_face;
      setWaitUntilAsMs(reponse.limitWait);
    },
    onError(err, vars, context) {
      if (err.statusCode == 429) {
        setWaitUntilAsMs(Number(err.message) || 0);
        return;
      }
      onError(err, vars, context);
    },
  });

  const reqAuthOTP = useCallback(() => {
    reqOTP({ phone, type });
  }, [reqOTP, phone, type]);

  useEffect(() => {
    if (!init) return;
    reqAuthOTP();
  }, [reqAuthOTP]);

  return { reqAuthOTP, requestTime, isRequestingOtp, isOverRequestTime };
};

export default useSendAuthVerifyCode;

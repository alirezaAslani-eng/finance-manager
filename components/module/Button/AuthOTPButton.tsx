import { CircleLoader } from "@/components/ui";
import { useAuth } from "@/context";
import { useSendAuthVerifyCode } from "@/hooks";
import { Button, ButtonProps, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface MyProps {
  otpType: "signin" | "signup";
  muiProps?: ButtonProps;
  isVerifying?: boolean;
  autoRequest?: boolean;
}

function AuthOTPButton({
  isVerifying,
  muiProps,
  otpType,
  autoRequest = true,
}: MyProps) {
  const {
    userInfo: { phone },
  } = useAuth();

  const { isOverRequestTime, isRequestingOtp, requestTime, reqAuthOTP } =
    useSendAuthVerifyCode({
      phone,
      type: otpType,
      init: autoRequest,
    });
  return (
    <>
      {isOverRequestTime ? (
        <Button
          fullWidth
          size="large"
          variant={"contained"}
          {...muiProps}
          disabled={isVerifying || isRequestingOtp}
          onClick={reqAuthOTP}
        >
          {isRequestingOtp || isVerifying ? <CircleLoader /> : "درخواست رمز"}
        </Button>
      ) : (
        <Typography component={"span"}>
          {`درخواست مجدد بعد از ${requestTime}`}
        </Typography>
      )}
    </>
  );
}

export default React.memo(AuthOTPButton);

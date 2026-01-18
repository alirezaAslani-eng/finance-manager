import { CircleLoader } from "@/components/ui";
import { useSendAuthVerifyCode } from "@/hooks";
import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";

interface MyProps {
  muiProps?: ButtonProps;
  otpType: "signin" | "signup";
  isVerifying?: boolean;
  autoRequest?: boolean;
  phone: string | undefined;
}

function AuthOTPButton({
  isVerifying,
  muiProps,
  otpType,
  autoRequest = true,
  phone = "",
}: MyProps) {
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

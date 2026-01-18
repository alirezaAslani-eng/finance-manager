import { AuthOTPButton } from "@/components/module";
import { Form, MultipleInputs } from "@/components/ui";
import { useAuth } from "@/context";
import { useSignin } from "@/hooks";

import { Box } from "@mui/material";
import { useCallback } from "react";

function verify_signin() {
  const {
    userInfo: { phone },
  } = useAuth();
  const { isErrorSignin, isSigninig, isSuccessSignin, signin } = useSignin();
  const _signin = useCallback(
    (otpCode: string) => {
      signin({ phone, otpCode });
    },
    [phone, signin]
  );

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100svh"}
      px={"24px"}
    >
      <Form isSubmiting={isSigninig || isSuccessSignin}>
        <Form.Title>{"هزینه یار"}</Form.Title>
        <Form.FormBox>
          <Form.FormBox.FormTitle>
            {"کد به شماره زیر ارسال شد"}
          </Form.FormBox.FormTitle>
          <Form.FormBox.SubTitle>
            {!!!phone ? (
              <>
                <Form.FormBox.SubTitle.Link href={"/auth/signin"}>
                  شماره تماس را وارد کنید
                </Form.FormBox.SubTitle.Link>
              </>
            ) : (
              <>
                {phone}
                <Form.FormBox.SubTitle.Link href={"/auth/signin"}>
                  ویرایش
                </Form.FormBox.SubTitle.Link>
              </>
            )}
          </Form.FormBox.SubTitle>
          <Box
            mt={{ xs: "12px", sm: "24px" }}
            display={"flex"}
            justifyContent={"center"}
          >
            <MultipleInputs
              error={isErrorSignin}
              inputCount={5}
              onComplete={_signin}
            />
          </Box>
          <Box mt={{ xs: "12px", sm: "24px" }}>
            <AuthOTPButton
              otpType="signin"
              isVerifying={isSigninig}
              autoRequest={false}
              phone={phone}
            />
          </Box>
        </Form.FormBox>
        <Form.RuleDescription />
      </Form>
    </Box>
  );
}

export default verify_signin;

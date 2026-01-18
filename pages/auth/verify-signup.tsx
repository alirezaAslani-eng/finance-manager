import { AuthOTPButton } from "@/components/module";
import { Form, MultipleInputs } from "@/components/ui";
import { useSignup } from "@/hooks";
import { Box } from "@mui/material";

function verify_signup() {
  const { isSgininup, isSuccessSignup, signupInfo, signup } = useSignup();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      px={"20px"}
      height={"100svh"}
    >
      <Form isSubmiting={isSuccessSignup || isSgininup}>
        <Form.Title>{"هزینه یار"}</Form.Title>
        <Form.FormBox>
          {signupInfo?.phone && (
            <Form.FormBox.FormTitle>
              {"کد به شماره زیر ارسال شد"}
            </Form.FormBox.FormTitle>
          )}
          <Form.FormBox.SubTitle>
            {signupInfo?.phone}
            <Form.FormBox.SubTitle.Link href="/auth/signup">
              {!signupInfo?.phone ? "اول فرم ثبت نام را تکمیل کن" : "ویرایش"}
            </Form.FormBox.SubTitle.Link>
          </Form.FormBox.SubTitle>

          <Box mt={"24px"}>
            <MultipleInputs inputCount={5} onComplete={signup} />
          </Box>
          <Box mt={"24px"}>
            <AuthOTPButton
              autoRequest={false}
              otpType="signup"
              phone={signupInfo?.phone}
            />
          </Box>
        </Form.FormBox>
        <Form.RuleDescription />
      </Form>
    </Box>
  );
}

export default verify_signup;

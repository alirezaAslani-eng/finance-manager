import { MuiTextField, RequestOtpButton } from "@/components/ui";
import { userSchema, verifySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { alpha, Box, Button, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Infer } from "zod";
import { AuthContex } from "@/context";
import { useCheckUserPhone, useLogin, useRequestOtp } from "@/hooks";
import { OtpType_enum } from "@/types/opt.types";
function LoginForm() {
  const [isVerifiedPhone, setIsVerifiedPhone] = useState<boolean>(false);

  const successPhoneVerify = () => {
    setIsVerifiedPhone(true);
  };

  // * final login by verify otp code ================ >
  const { login } = useLogin();
  const verifyAndLogin = async (form: unknown) => {
    const formInfo = form as Infer<typeof verifySchema>;
    await login({ otpCode: formInfo.otpCode, phone: formInfo.phone });
  };

  return (
    <>
      {isVerifiedPhone ? (
        <VerifyCodeForm
          submitText="ورود"
          title="خوش اومدی"
          subTitle="ورود"
          verifyType="signin"
          onVerify={verifyAndLogin}
        />
      ) : (
        <VerifyPhoneForm onVerify={successPhoneVerify} />
      )}
    </>
  );
}

export default LoginForm;

interface VerifyPhoneForm_prop {
  onVerify: () => void;
}
function VerifyPhoneForm({ onVerify }: VerifyPhoneForm_prop) {
  // * Mui Theme ==================== >
  const { palette } = useTheme();

  // * Form state and Schema Handler ================== >
  const phoneSchema = userSchema.pick({ phone: true });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(phoneSchema) });

  // * user Auth contex to set user phone if it was valid ===================== >
  const { setInfo } = useContext(AuthContex)!;

  // * Submit and check user phone ============== >
  const isValidPhone = useCheckUserPhone();
  const submiter = async (form: unknown) => {
    const { phone } = form as Infer<typeof phoneSchema>;
    const isValid = await isValidPhone(phone);
    if (isValid) {
      setInfo({ phone });
      onVerify();
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submiter)}
      sx={{
        width: "400px",
        backgroundColor:
          palette.mode == "dark"
            ? alpha(palette.primary.main, 0.1)
            : alpha(palette.primary.main, 0.2),
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Box
        component={"fieldset"}
        disabled={isSubmitting}
        sx={{
          opacity: isSubmitting ? "0.5" : "1",
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "0",
        }}
      >
        {/* Heading ==================== > */}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {/* Title ========================== > */}
          <Typography variant="h1" sx={{ fontSize: "35px" }}>
            {"ورود با موبایل"}
          </Typography>

          {/* Create Account Link ===================== > */}
          <Typography sx={{ fontSize: "18px", mt: "15px" }}>
            حساب ندارید ؟ <Link href={"/auth/signup"}>ایجاد حساب</Link>
          </Typography>
        </Box>
        {/* Input =================== > */}
        <MuiTextField
          errorText={errors?.["phone"]?.message}
          textFieldProps={{ ...register("phone"), label: "شماره تماس" }}
        />

        {/* Submit ======================== > */}
        <Button
          type="submit"
          sx={{ width: "100%", fontSize: "18px" }}
          variant="contained"
          size="medium"
        >
          دریافت کد
        </Button>
      </Box>
    </Box>
  );
}

interface VerifyCodeForm_prop {
  onVerify: (form: Infer<typeof verifySchema>) => Promise<void>;
  verifyType: keyof typeof OtpType_enum;
  title: string;
  subTitle: string;
  submitText: string;
}
const VerifyCodeForm = ({
  onVerify = async () => {},
  verifyType = "signin",
  subTitle,
  submitText,
  title,
}: VerifyCodeForm_prop) => {
  // * Mui Theme ==================== >
  const { palette } = useTheme();

  // * user phone from context ================ >
  const {
    userInfo: { phone },
  } = useContext(AuthContex)!;

  // * Form state and Schema Handler ================== >
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(verifySchema) });

  // * request otp hook ================= >
  const { requestOtp, isRequesting, otpWaitTime } = useRequestOtp(verifyType);

  const sendOtpRequest = async () => {
    await requestOtp(phone);
  };

  const verify = async (f: unknown) => {
    const verifyInfo = f as Infer<typeof verifySchema>;
    await onVerify(verifyInfo);
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(verify)}
      sx={{
        width: "400px",
        backgroundColor:
          palette.mode == "dark"
            ? alpha(palette.primary.main, 0.1)
            : alpha(palette.primary.main, 0.2),
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Box
        component={"fieldset"}
        disabled={isSubmitting}
        sx={{
          opacity: isSubmitting ? "0.5" : "1",
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "0",
        }}
      >
        {/* Heading ==================== > */}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {/* Title ========================== > */}
          <Typography variant="h1" sx={{ fontSize: "35px" }}>
            {title}
          </Typography>

          {/* Create Account Link ===================== > */}
          <Typography sx={{ fontSize: "18px", mt: "15px" }}>
            {subTitle}
          </Typography>
        </Box>
        {/* Input =================== > */}
        <MuiTextField
          errorText={errors?.["otpCode"]?.message}
          textFieldProps={{ ...register("otpCode"), label: "کد یکبار مصرف" }}
        />
        {/* Hidden input will send phone value */}
        <input type="hidden" {...register("phone")} defaultValue={phone} />
        {/* Submit ======================== > */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Button type="submit">{submitText}</Button>
          <RequestOtpButton
            futureMsTime={otpWaitTime}
            isRequesting={isRequesting}
            onRequest={sendOtpRequest}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { VerifyCodeForm };

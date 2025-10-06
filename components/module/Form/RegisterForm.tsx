import { MuiButton, MuiTextField } from "@/components/ui";
import { userSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { alpha, Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Infer } from "zod";
import { VerifyCodeForm } from "./LoginForm";
import useRegister from "@/hooks/useRegister";

function SignUp() {
  const { checkSignupInfo, verifyUser, isSuccessRegister, signupInfo } =
    useRegister();

  return (
    <>
      {isSuccessRegister ? (
        <VerifyCodeForm
          title={signupInfo?.phone as string}
          submitText="ثبت نام"
          subTitle="ثبت نام کنید"
          verifyType="signup"
          onVerify={verifyUser}
        />
      ) : (
        <RegisterForm onRegister={checkSignupInfo} />
      )}
    </>
  );
}

export default SignUp;

function RegisterForm({
  onRegister,
}: {
  onRegister: (userInfo: Infer<typeof userSchema>) => Promise<void>;
}) {
  // * Mui Theme ======================= >
  const { palette } = useTheme();

  // * Form Handler ======================= >
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(userSchema) });

  // * Send info out of the component, if they were valid ================ >
  const submiter = async (f: unknown) => {
    const userInfo = f as Infer<typeof userSchema>;
    onRegister(userInfo);
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
      {/* Heading ========================= > */}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        {/* Title ========================== > */}
        <Typography variant="h1" sx={{ fontSize: "35px" }}>
          {"به هزینه یار خوش آمدید"}
        </Typography>

        {/* Create Account Link ===================== > */}
        <Typography sx={{ fontSize: "18px", mt: "15px" }}>
          حساب دارم : <Link href={"/auth/signin"}>ورود</Link>
        </Typography>
      </Box>
      {/* Body ======================== > */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          mt: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <MuiTextField
            textFieldProps={{
              ...register("userName"),
              placeholder: "نام کاربری",
              sx: { flex: "1" },
            }}
            errorText={errors?.["userName"]?.message}
          />
          <MuiTextField
            textFieldProps={{
              ...register("fullName"),
              placeholder: "نام کامل",
              sx: { flex: "1" },
            }}
            errorText={errors?.["fullName"]?.message}
          />
        </Box>
        <MuiTextField
          textFieldProps={{ ...register("phone"), placeholder: "شماره تماس" }}
          errorText={errors?.["phone"]?.message}
        />
        <MuiTextField
          textFieldProps={{ ...register("email"), placeholder: "ایمیل" }}
          errorText={errors?.["email"]?.message}
        />
        <MuiTextField
          textFieldProps={{ ...register("password"), placeholder: "رمز عبور",type:"password" }}
          errorText={errors?.["password"]?.message}
        />
        <input type="hidden" {...register("otpCode")} defaultValue={"00000"} />
        <MuiButton
          buttonProps={{
            type: "submit",
            sx: { fontSize: "20px" },
            disabled: isSubmitting,
          }}
        >
          {"ثبت نام"}
        </MuiButton>
      </Box>

      {/* Footer ======================== > */}
    </Box>
  );
}

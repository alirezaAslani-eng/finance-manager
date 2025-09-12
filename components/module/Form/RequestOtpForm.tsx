import { MuiButton, MuiTextField } from "@/components/ui";
import { sendCodeSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { alpha, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRequestOtp } from "@/hooks";
import { Infer } from "zod";
function LoginForm() {
  // * Mui Theme ==================== >
  const { palette } = useTheme();


  // * Form state and Schema Handler ================== >
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(sendCodeSchema) });


  // * Otp Request ============================ >
  const requestOtp = useRequestOtp();
  const submiter = async (form: unknown) => {
    const formInfo = form as Infer<typeof sendCodeSchema>;
    await requestOtp(formInfo);
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
          <MuiButton
            buttonProps={{
              type: "submit",
              sx: { width: "100%", fontSize: "18px" },
            }}
          >
            دریافت کد
          </MuiButton>
        </Box>
      </Box>
  );
}

export default LoginForm;

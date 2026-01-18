import { Form } from "@/components/ui";
import { SignupContext } from "@/context";
import { useCheckSignupInfo } from "@/hooks";
import { signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

function signup() {
  const { signupInfo } = useContext(SignupContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema().omit({ otpCode: true })),
    defaultValues: signupInfo! ?? undefined,
  });
  const { checkInfo, isSuccessCheck } = useCheckSignupInfo();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      px={"20px"}
      pt={{ xs: "30px", sm: "60px" }}
    >
      <Form
        muiProps={{ onSubmit: handleSubmit(checkInfo) }}
        isSubmiting={isSubmitting || isSuccessCheck}
      >
        <Form.Title>{"هزینه یار"}</Form.Title>
        <Form.FormBox>
          <Form.FormBox.FormTitle>
            {"شروع یک مدیریت حرفه ای"}
          </Form.FormBox.FormTitle>
          <Form.FormBox.SubTitle>
            {"حساب دارم"}
            <Form.FormBox.SubTitle.Link href="/auth/signin">
              {"ورود"}
            </Form.FormBox.SubTitle.Link>
          </Form.FormBox.SubTitle>

          <Form.FormBox.Input
            error={!!errors?.fullName}
            placeholder="نام و نام خانوادگی"
            {...register("fullName")}
          >
            {errors?.fullName?.message}
          </Form.FormBox.Input>

          <Form.FormBox.Input
            error={!!errors?.userName}
            placeholder="نام کاربری"
            {...register("userName")}
          >
            {errors?.userName?.message}
          </Form.FormBox.Input>

          <Form.FormBox.Input
            error={!!errors?.email}
            placeholder="ایمیل"
            {...register("email")}
          >
            {errors?.email?.message}
          </Form.FormBox.Input>

          <Form.FormBox.Input
            error={!!errors?.phone}
            placeholder="شماره موبایل"
            {...register("phone")}
          >
            {errors?.phone?.message}
          </Form.FormBox.Input>

          <Form.FormBox.Input
            error={!!errors?.password}
            placeholder="رمز عبور"
            type="password"
            {...register("password")}
          >
            {errors?.password?.message}
          </Form.FormBox.Input>

          <Form.FormBox.SubmitButton>{"ثبت نام"}</Form.FormBox.SubmitButton>
        </Form.FormBox>
        <Form.RuleDescription />
      </Form>
    </Box>
  );
}

export default signup;

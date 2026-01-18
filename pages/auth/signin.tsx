import { Form } from "@/components/ui";
import { useAuth } from "@/context";
import { useCheckUserPhone } from "@/hooks";
import { signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

function signin() {
  const { userInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema().pick({ phone: true })),
    defaultValues: { phone: userInfo.phone },
  });
  const { checkPhone, isSuccess } = useCheckUserPhone();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100svh"}
      px={"24px"}
    >
      <Form
        isError={!!errors?.phone}
        isSubmiting={isSubmitting || isSuccess}
        muiProps={{ onSubmit: handleSubmit(checkPhone) }}
      >
        <Form.Title>{"هزینه یار"}</Form.Title>
        <Form.FormBox>
          <Form.FormBox.FormTitle>
            {"ورود با شماره موبایل"}
          </Form.FormBox.FormTitle>

          <Form.FormBox.SubTitle>
            {"ثبت نام نکردی؟"}
            <Form.FormBox.SubTitle.Link href="/auth/signup">
              {"ثبت نام"}
            </Form.FormBox.SubTitle.Link>
          </Form.FormBox.SubTitle>

          <Form.FormBox.Input
            placeholder="شماره موبایل"
            {...register("phone")}
          />
          <Form.FormBox.SubmitButton>{"ورود"}</Form.FormBox.SubmitButton>
        </Form.FormBox>
        <Form.RuleDescription />
      </Form>
    </Box>
  );
}

export default signin;

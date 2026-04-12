import { Box, Typography, Stack, TextField } from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { AccountInput, InputError, PriceInput } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { setupUserSchema } from "@/lib/validations";
import type { BoxProps, StackProps } from "@mui/material";
import type { SetupUserSchemaType } from "@/lib/validations/types";
import SubmitButton from "../Button/SubmitButton";
import { useSetupUserProfile } from "@/hooks";

interface SetupUserFormProps extends Omit<BoxProps<"form">, "onSubmit"> {}

const formSchema = setupUserSchema();

const SetupUserForm = (props: SetupUserFormProps) => {
  const { setupUser } = useSetupUserProfile();

  // * Form Config ================== >
  const useFormReturnValue = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider<SetupUserSchemaType> {...useFormReturnValue}>
      <Box
        component={"form"}
        {...props}
        onSubmit={useFormReturnValue.handleSubmit(setupUser)}
      >
        {props.children}
      </Box>
    </FormProvider>
  );
};

SetupUserForm.FormContainer = function (props: StackProps) {
  const {
    formState: { errors, isSubmitting },
    register,
    control,
  } = useFormContext<SetupUserSchemaType>();

  return (
    <Stack gap={"24px"} {...props}>
      {/* // * Account inputs =================== > */}
      <Box>
        <Typography fontSize={"20px"}>اطلاعات کارت</Typography>
        <Stack spacing={2} mt={"10px"}>
          <Box>
            <TextField
              disabled={isSubmitting}
              placeholder="نام صاحب کارت"
              label="نام صاحب کارت"
              fullWidth={true}
              error={!!errors?.["accountName"]?.message}
              {...register("accountName")}
            />
            <InputError errorText={errors?.["accountName"]?.message} />
          </Box>

          <AccountInput
            disabled={isSubmitting}
            control={control}
            errorText={errors?.["cardNumber"]?.message}
          />
          <Box>
            <Controller
              name="currentBalance"
              control={control}
              render={({ field }) => {
                return (
                  <PriceInput
                    disabled={isSubmitting}
                    label="مجودی فعلی"
                    placeholder="به (تومان)"
                    fullWidth={true}
                    error={!!errors?.["currentBalance"]?.message}
                    {...field}
                  />
                );
              }}
            />
            <InputError errorText={errors?.["currentBalance"]?.message} />
          </Box>
        </Stack>
      </Box>

      {/* // * Category inputs =================== > */}
      <Box>
        <Typography fontSize={"20px"}>{"دسته بندی"}</Typography>
        <Box mt={"10px"}>
          <TextField
            disabled={isSubmitting}
            placeholder="مثلا (خرج خونه , سلامت , تفریح)"
            label="دسته بندی"
            fullWidth={true}
            error={!!errors?.["categoryName"]?.message}
            {...register("categoryName")}
          />
          <InputError errorText={errors?.["categoryName"]?.message} />
        </Box>
      </Box>
    </Stack>
  );
};

SetupUserForm.SubmitButton = SubmitButton;

export default SetupUserForm;

import { AccountInput, InputError, PriceInput } from "@/components/ui";
import { createAccountSchema } from "@/lib/validations";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, BoxProps, Stack, TextField } from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import SubmitButton from "../Button/SubmitButton";

const formSchema = createAccountSchema();

function CreateAccountForm(
  props: Omit<BoxProps<"form">, "onSubmit" | "component">,
) {
  // * Form Handler ======================== >
  const useFormReturnValue = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      {/* // * Share form state ========= > */}
      <FormProvider {...useFormReturnValue}>
        {/* // * Form ====================== > */}
        <Box
          {...props}
          onSubmit={useFormReturnValue.handleSubmit(() => {})}
          component={"form"}
        >
          {props.children}
        </Box>
      </FormProvider>
    </>
  );
}

CreateAccountForm.FormContainer = function () {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateAccountSchemaType>()!;

  return (
    <>
      {/* Owner's name Field =================================== > */}
      <Stack gap={"12px"}>
        <Box>
          <TextField
            disabled={isSubmitting}
            error={!!errors?.["accountName"]?.message}
            {...register("accountName")}
            label="نام صاحب کارت"
            placeholder="نام صاحب کارت"
          />
          <InputError errorText={errors?.["accountName"]?.message} />
        </Box>
        {/* Card Number Field =================================== > */}
        <Box>
          <AccountInput
            control={control}
            errorText={errors?.["cardNumber"]?.message}
            disabled={isSubmitting}
            placeholder="شماره کارت (۱۶ رقم)"
          />
        </Box>
        {/* Current Balance Field =================================== > */}
        <Box>
          <Controller
            control={control}
            name="currentBalance"
            render={({ field }) => {
              return (
                <PriceInput
                  {...field}
                  disabled={isSubmitting}
                  error={!!errors?.["currentBalance"]?.message}
                  placeholder="مجودی فعلی حساب"
                />
              );
            }}
          />
          <InputError errorText={errors?.["currentBalance"]?.message} />
        </Box>
      </Stack>
    </>
  );
};

CreateAccountForm.SubmitButton = SubmitButton;

export default CreateAccountForm;

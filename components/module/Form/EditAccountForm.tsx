import { AccountInput, InputError } from "@/components/ui";
import { useEditAccount } from "@/hooks";
import { editAccountSchema } from "@/lib/validations";
import { EditAccountSchemaType } from "@/lib/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, BoxProps, TextField } from "@mui/material";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import SubmitButton from "../Button/SubmitButton";

interface EditAccountFormProps extends PropsWithChildren {
  accountId: string;
}

const formSchema = editAccountSchema();

function EditAccountForm({ accountId, children }: EditAccountFormProps) {
  const useFormReturnValue = useForm({ resolver: zodResolver(formSchema) });

  const { editAccount } = useEditAccount(accountId);

  return (
    <FormProvider<EditAccountSchemaType> {...useFormReturnValue}>
      <Box
        component={"form"}
        onSubmit={useFormReturnValue.handleSubmit(editAccount)}
        width={"100%"}
      >
        {children}
      </Box>
    </FormProvider>
  );
}

EditAccountForm.FormContainer = function (props: BoxProps) {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<EditAccountSchemaType>();

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"16px"} {...props}>
      <Box>
        <TextField
          placeholder="به نام :"
          label="نام صاحب کارت"
          disabled={isSubmitting}
          error={!!errors?.accountName?.message}
          {...register("accountName")}
        />
        <InputError errorText={errors?.accountName?.message} />
      </Box>

      <AccountInput
        control={control}
        disabled={isSubmitting}
        errorText={errors?.cardNumber?.message}
      />
    </Box>
  );
};

EditAccountForm.SubmitButton = SubmitButton;

export default EditAccountForm;

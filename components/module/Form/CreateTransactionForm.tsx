import dana_md from "@/constant/font/dana_md";
import { useAuth } from "@/context";
import { transactionTypesList } from "@/lib/constant";
import { createTransactionSchema } from "@/lib/validations";
import type { CreateTransactionSchemaType } from "@/lib/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  AccountMenuItem,
  InputError,
  PriceInput,
  SelectField,
} from "@/components/ui";
import {
  Box,
  BoxProps,
  MenuItem,
  Stack,
  StackProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SubmitButton from "../Button/SubmitButton";

function CreateTransactionForm(props: BoxProps<"form">) {
  // * Form Setup ======================== >
  const useFormReturnValue = useForm({
    resolver: zodResolver(createTransactionSchema()),
    defaultValues: {
      category: "", // * to fix uncontroled warn
      account: "", // * to fix uncontroled warn
      type: "0",
    },
  });

  const submiter = async (form: unknown) => {
    console.log(form);
    //  Todo create transaction logic
    await new Promise((res) => {
      setTimeout(() => {
        res("");
      }, 3000);
    });
  };

  return (
    <>
      <FormProvider {...useFormReturnValue}>
        <Box
          {...props}
          component={"form"}
          onSubmit={useFormReturnValue.handleSubmit(submiter)}
        >
          {props.children}
        </Box>
      </FormProvider>
    </>
  );
}

CreateTransactionForm.FormContainer = function (props: StackProps) {
  // * --------- shared return values of useForm hook ---------
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateTransactionSchemaType>();

  // * ----- This form needs user's info and state -----
  const {
    userInfo: { accounts, categories },
  } = useAuth();

  return (
    <Stack width={"100%"} gap={"12px"} {...props}>
      <Box>
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            return (
              <ToggleButtonGroup {...field} fullWidth disabled={isSubmitting}>
                {transactionTypesList.map(({ text, type }) => {
                  return (
                    <ToggleButton
                      value={type}
                      color={type === "0" ? "error" : "success"}
                    >
                      {text}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            );
          }}
        />
      </Box>

      <Box>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => {
            return (
              <PriceInput
                {...field}
                disabled={isSubmitting}
                error={!!errors?.["amount"]?.message}
                label={"مقدار تراکنش"}
                placeholder="به تومان"
              />
            );
          }}
        />
        <InputError errorText={errors?.["amount"]?.message} />
      </Box>

      <Box>
        <Controller
          control={control}
          name="category"
          render={({ field }) => {
            return (
              <SelectField
                label="دسته بندی"
                error={!!errors?.["category"]?.message}
                disabled={isSubmitting}
                {...field}
              >
                {categories.map(({ _id, name }) => {
                  return (
                    <MenuItem value={_id}>
                      <Box className={dana_md.className}>{name}</Box>
                    </MenuItem>
                  );
                })}
              </SelectField>
            );
          }}
        />
        <InputError errorText={errors?.["category"]?.message} />
      </Box>

      <Box>
        <Controller
          control={control}
          name="account"
          render={({ field }) => {
            return (
              <>
                <SelectField
                  error={!!errors?.["account"]?.message}
                  label={"حساب بانکی"}
                  disabled={isSubmitting}
                  {...field}
                >
                  {accounts.map((account) => {
                    return (
                      <MenuItem value={account._id}>
                        <AccountMenuItem {...account} />
                      </MenuItem>
                    );
                  })}
                </SelectField>
              </>
            );
          }}
        />
        <InputError errorText={errors?.account?.message} />
      </Box>

      <Box>
        <TextField
          error={!!errors?.["reason"]?.message}
          disabled={isSubmitting}
          {...register("reason")}
          label="دلیل تراکنش"
          multiline={true}
          minRows={5}
        />
        <InputError errorText={errors?.["reason"]?.message} />
      </Box>
    </Stack>
  );
};
CreateTransactionForm.SubmitButton = SubmitButton;

export default CreateTransactionForm;

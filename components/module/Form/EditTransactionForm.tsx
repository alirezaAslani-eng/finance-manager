import { editTransactionSchema } from "@/lib/validations";
import { EditTransactionSchemaType } from "@/lib/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context";
import { InputError, PriceInput, SelectField } from "@/components/ui";
import SubmitButton from "../Button/SubmitButton";
import { transactionTypesList } from "@/lib/constant";
import {
  Box,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  EditTransactionFormContainerProps,
  EditTransactionFormProps,
} from "../types";
import { PWC } from "@/types/utils";

const formSchema = editTransactionSchema();
function EditTransactionForm({
  children,
  transaction,
}: PWC<EditTransactionFormProps>) {
  const useFormReturnValue = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: transaction,
  });

  return (
    <FormProvider<EditTransactionSchemaType> {...useFormReturnValue}>
      <Box
        component={"form"}
        width={"100%"}
        onSubmit={useFormReturnValue.handleSubmit(() => {})}
      >
        {children}
      </Box>
    </FormProvider>
  );
}

EditTransactionForm.FormContainer = function ({
  stackProps,
  isLatestTransaction,
}: EditTransactionFormContainerProps) {
  const {
    isAuthing,
    userInfo: { categories },
  } = useAuth();

  // * ------ Form's config ------
  const {
    control,
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<EditTransactionSchemaType>();

  return (
    <Stack gap={"12px"} {...stackProps}>
      {/* // * Transaction Type ========= >  */}
      <Box>
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <ToggleButtonGroup
                {...field}
                disabled={isLatestTransaction || isSubmitting}
                fullWidth
              >
                {transactionTypesList.map(({ text, type, id }) => {
                  return (
                    <ToggleButton
                      key={id}
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
      {/* // * Category field ============== >>> */}
      <Box>
        <Controller
          control={control}
          name="category"
          render={({ field }) => {
            return (
              <SelectField
                {...field}
                label="دسته بندی"
                error={!!errors.category?.message}
                disabled={isAuthing || isSubmitting}
              >
                {categories.map(({ _id, name }) => {
                  return <MenuItem value={_id}>{name}</MenuItem>;
                })}
              </SelectField>
            );
          }}
        />
        <InputError errorText={errors.category?.message} />
      </Box>
      {/* // * Amount field ============== >>> */}
      <Box>
        <Controller
          control={control}
          name="amount"
          render={({ field }) => {
            return (
              <PriceInput
                {...field}
                placeholder="به تومان"
                label={"مبلغ  تراکنش"}
                error={!!errors.amount?.message}
                disabled={isLatestTransaction || isSubmitting}
              />
            );
          }}
        />
        <InputError errorText={errors.amount?.message} />
      </Box>

      {/* // * Reason field ============== >>> */}
      <Box>
        <TextField
          multiline
          minRows={5}
          label="دلیل تراکنش"
          {...register("reason")}
          error={!!errors.reason?.message}
        />
        <InputError errorText={errors.reason?.message} />
      </Box>
    </Stack>
  );
};

EditTransactionForm.SubmitButton = SubmitButton;

export default EditTransactionForm;

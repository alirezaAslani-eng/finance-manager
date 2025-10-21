import {
  MuiButton,
  MuiSelectInput,
  MuiTextField,
  MuiToggleButton,
} from "@/components/ui";
import { AuthContex } from "@/context";
import { transactionEditSchema } from "@/lib/validations";
import { transactionEditSchemaType } from "@/lib/validations/transactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, ToggleButton } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

interface MyProps {
  defaultValues: transactionEditSchemaType;
  onSubmit?: (info: transactionEditSchemaType) => Promise<void>;
  isLatestTransaction?: boolean;
}

function EditTransactionform({
  defaultValues = {
    category: "",
    reason: "",
    account: "",
    amount: 0,
    type: "1",
  },
  isLatestTransaction,
  onSubmit = async () => {},
}: MyProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(transactionEditSchema),
    defaultValues,
  });

  // * select field values ============== >
  const {
    userInfo: { categories, accounts },
  } = useContext(AuthContex)!;
  const categoryOptions = useMemo(() => {
    return categories.map((cat) => {
      return { text: cat.name, value: cat._id };
    });
  }, [categories]);

  const accountOptions = useMemo(() => {
    return accounts.map((account) => {
      return { text: `${account.accountName} ${account.cardNumber}`, value: account._id };
    });
  }, [accounts]);

  // * submiter ================= >
  const submit = async (f: unknown) => {
    await onSubmit(f as transactionEditSchemaType);
    reset(getValues());
  };

  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit(submit)}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Grid container spacing={2}>
          {/* // * Category field ============== >>> */}
          <Grid size={{ xs: 12, _700: 4 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                return (
                  <MuiSelectInput
                    selectItems={categoryOptions}
                    errorText={errors?.["category"]?.message}
                    inputProps={{
                      disabled: isSubmitting,
                      ...field,
                      label: "دسته بندی",
                    }}
                  />
                );
              }}
            />
          </Grid>
          {/* // * Account field ============== >>> */}
          <Grid size={{ xs: 12, _700: 4 }}>
            <Controller
              name="account"
              control={control}
              render={({ field }) => {
                return (
                  <MuiSelectInput
                    selectItems={accountOptions}
                    errorText={errors?.["account"]?.message}
                    inputProps={{
                      disabled: !isLatestTransaction ? true : isSubmitting,
                      ...field,
                      label: "حساب",
                    }}
                  />
                );
              }}
            />
          </Grid>
          {/* // * Amount field ============== >>> */}
          <Grid size={{ xs: 12, _700: 4 }}>
            <MuiTextField
              errorText={errors?.["amount"]?.message}
              textFieldProps={{
                disabled: !isLatestTransaction ? true : isSubmitting,
                ...register("amount", { valueAsNumber: true }),
                placeholder: "مقدار تراکنش",
              }}
            />
          </Grid>
          {/* // * Reason field ============== >>> */}
          <Grid size={12}>
            <MuiTextField
              errorText={errors?.["reason"]?.message}
              textFieldProps={{
                disabled: isSubmitting,
                ...register("reason"),
                placeholder: "توضیحات تراکنش",
                multiline: true,
                rows: 8,
              }}
            />
          </Grid>
        </Grid>
        {/* // * Edit Type Button ========= >  */}
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <MuiToggleButton
                inputProps={{
                  ...field,
                  disabled: !isLatestTransaction ? true : isSubmitting,
                }}
                onChange={field.onChange}
              >
                <ToggleButton value="1" color="success">
                  {"واریز"}
                </ToggleButton>
                <ToggleButton value="0" color="error">
                  {"برداشت"}
                </ToggleButton>
              </MuiToggleButton>
            );
          }}
        />

        {/* // * Submit button ================== > */}
        {isDirty && (
          <MuiButton
            buttonProps={{
              disabled: isSubmitting,
              size: "large",
              type: "submit",
              sx: { width: { xs: "100%", sm: "fit-content" } },
            }}
          >
            {isSubmitting ? "در حال ویرایش" : "ویرایش"}
          </MuiButton>
        )}
      </Box>
    </>
  );
}

export default EditTransactionform;

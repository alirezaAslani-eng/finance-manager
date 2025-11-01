import { MuiSelectInput, MuiTextField, SwitchButton } from "@/components/ui";
import { AuthContex, ModalContext } from "@/context";
import { transactionSchema } from "@/lib/validations";
import type { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useContext, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

interface MyProps {
  onSubmit?: (info: transactionSchemaType) => Promise<void>;
}
function TransactionForm({ onSubmit = async () => {} }: MyProps) {
  // * Form Handler ======================== >
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      account: "", // * to fix uncontroled warn
      category: "", // * to fix uncontroled warn
    },
  });

  // * Auth Context to access to user's accounts and categories ==================== >
  const {
    userInfo: { accounts, categories },
  } = useContext(AuthContex)!;

  // * Submiter ======================== >
  const submiter = async (form: unknown) => {
    await onSubmit(form as transactionSchemaType);
  };

  //  * Input select options ========================== >
  const selectAccounts = useMemo(() => {
    return accounts.map((account) => ({
      text: `${account.cardNumber}  ${account.accountName}`,
      value: account._id,
    }));
  }, [accounts]);

  const categoriesSelect = useMemo(() => {
    return categories.map((category) => ({
      text: `${category.name}`,
      value: category._id,
    }));
  }, [categories]);

  // * style ================ >
  const { palette } = useTheme();

  // * Modal Context to open edit category modal ====== >
  const { openEditCategoryModal } = useContext(ModalContext);

  // * Category Select input Edit Event ======= >
  const editCategoryClick = (categoryId: string) => {
    openEditCategoryModal({ categoryId });
  };

  return (
    <Box>
      {/* Title ==================== > */}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "34px",
            color: muiTheme(palette.mode, {
              light: palette.grey[800],
              dark: palette.grey[100],
            }),
          },
          p: "20px 0px",
        }}
      >
        تراکنش جدید
      </Typography>

      {/* Form ====================== > */}
      <Box component={"form"} onSubmit={handleSubmit(submiter)}>
        <Grid container spacing={2}>
          {/* Price Field =================================== > */}
          <Grid size={{ xs: 12, _600: 4 }}>
            <MuiTextField
              errorText={errors?.["amount"]?.message}
              textFieldProps={{
                disabled: isSubmitting,
                ...register("amount", { valueAsNumber: true }),
                placeholder: "مقدار تراکنش",
              }}
            />
          </Grid>
          {/* Account Field =================================== > */}
          <Grid size={{ xs: 12, _600: 4 }}>
            <Controller
              control={control}
              name="account"
              render={({ field }) => {
                return (
                  <MuiSelectInput
                    errorText={errors?.["account"]?.message}
                    selectItems={selectAccounts}
                    inputProps={{
                      ...field,
                      disabled: isSubmitting,
                      label: "انتخاب کارت",
                    }}
                  />
                );
              }}
            />
          </Grid>
          {/* Category Field =================================== > */}
          <Grid size={{ xs: 12, _600: 4 }}>
            <Controller
              control={control}
              name="category"
              render={({ field }) => {
                return (
                  <MuiSelectInput
                    isEditable
                    onEditOption={editCategoryClick}
                    errorText={errors?.["category"]?.message}
                    selectItems={categoriesSelect}
                    inputProps={{
                      ...field,
                      disabled: isSubmitting,
                      label: "دسته بندی",
                    }}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        {/* Reason Field =================================== > */}
        <MuiTextField
          errorText={errors?.["reason"]?.message}
          textFieldProps={{
            disabled: isSubmitting,
            ...register("reason"),
            placeholder: "دلیل تراکنش",
            multiline: true,
            minRows: 5,
            sx: { mt: "20px" },
          }}
        />
        {/* Submit Button ===================== > */}
        <Box sx={{ mt: "20px" }}>
          <SwitchButton
            type="submit"
            onExpenseClick={() => setValue("type", "0")}
            onIncomeClick={() => setValue("type", "1")}
            disabled={isSubmitting}
            isExpenseActive
            isInComeActive
            allButton={false}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TransactionForm;

import {
  MuiButton,
  MuiSelectInput,
  MuiTextField,
  SwitchButton,
} from "@/components/ui";
import { transactionSchema } from "@/lib/validations";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function TransactionForm() {
  // * Form Handler ======================== >
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  // * Submiter ======================== >
  const submiter = async () => {};

  // * style ================ >
  const { palette } = useTheme();
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
        {"تراکنش جدید"}
      </Typography>

      {/* Form ====================== > */}
      <Box onSubmit={handleSubmit(submiter)} component={"form"}>
        <Grid container spacing={2}>
          {/* Price Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["amount"]?.message}
              textFieldProps={{
                ...register("amount"),
                placeholder: "مقدار تراکنش",
              }}
            />
          </Grid>
          {/* Account Field =================================== > */}
          <Grid size={4}>
            <MuiSelectInput
            //   errorText={errors?.["account"]?.message}
            //   textFieldProps={{
            //     ...register("account"),
            //     placeholder: "برای کدوم حساب",
            //   }}
            />
          </Grid>
          {/* Category Field =================================== > */}
          <Grid size={4}>
            <MuiSelectInput
            //   errorText={errors?.["category"]?.message}
            //   textFieldProps={{
            //     ...register("category"),
            //     placeholder: "دسته بندی تراکنش",
            //   }}
            />
          </Grid>
        </Grid>
        {/* Reason Field =================================== > */}
        <MuiTextField
          errorText={errors?.["reason"]?.message}
          textFieldProps={{
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
            allButton={false}
            isExpenseActive
            isInComeActive
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TransactionForm;

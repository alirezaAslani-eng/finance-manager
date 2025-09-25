import {
  AccountCard,
  MuiButton,
  MuiSelectInput,
  MuiTextField,
  SwitchButton,
} from "@/components/ui";
import { accountSchema, transactionSchema } from "@/lib/validations";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function AccountForm() {
  // * Form Handler ======================== >
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(accountSchema),
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
          m: "20px 0px",
        }}
      >
        {"ثبت کارت جدید"}
      </Typography>

      {/* Form ====================== > */}
      <Box onSubmit={handleSubmit(submiter)} component={"form"}>
        <Grid container spacing={2}>
          {/* Owner's name Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["accountName"]?.message}
              textFieldProps={{
                ...register("accountName"),
                placeholder: "نام صاحب کارت",
              }}
            />
          </Grid>
          {/* Card Number Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["cardNumber"]?.message}
              textFieldProps={{
                ...register("cardNumber"),
                placeholder: "شماره کارت (۱۶ رقم)",
              }}
            />
          </Grid>
          {/* Current Balance Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["currentBalance"]?.message}
              textFieldProps={{
                ...register("currentBalance", { valueAsNumber: true }),
                placeholder: "مجودی فعلی حساب",
              }}
            />
          </Grid>
        </Grid>
        {/* Submit Button ===================== > */}
        <Box sx={{ mt: "20px" }}>
          <MuiButton
            buttonProps={{
              size: "large",
              sx: { fontSize: "18px" },
              type: "submit",
            }}
          >
            {"ثبت کارت جدید"}
          </MuiButton>
        </Box>
      </Box>
    </Box>
  );
}

export default AccountForm;

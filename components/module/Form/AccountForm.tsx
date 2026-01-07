import { AccountInput, MuiTextField } from "@/components/ui";
import { createAccountSchema } from "@/lib/validations";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { muiTheme } from "@/packages/mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

interface MyProps {
  edit?: boolean;
  onSubmit?: (accountInfo: CreateAccountSchemaType) => Promise<void>;
  defaultValues?: CreateAccountSchemaType;
}
function AccountForm({ edit, onSubmit, defaultValues }: MyProps) {
  // * Form Handler ======================== >
  const {
    getValues,
    reset,
    register,
    formState: { errors, isSubmitting, isDirty },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createAccountSchema()),
    defaultValues,
  });

  // * Submiter ======================== >
  const submiter = async (form: unknown) => {
    onSubmit && (await onSubmit(form as CreateAccountSchemaType));
    // * make form dirty after edit ================== >
    if (edit) {
      reset(getValues());
    }
  };

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
        {edit ? "ویرایش حساب بانکی" : "ثبت کارت جدید"}
      </Typography>

      {/* Form ====================== > */}
      <Box onSubmit={handleSubmit(submiter)} component={"form"}>
        <Grid container spacing={2}>
          {/* Owner's name Field =================================== > */}
          <Grid size={{ xs: 12, lg: edit ? 6 : 4 }}>
            <MuiTextField
              errorText={errors?.["accountName"]?.message}
              textFieldProps={{
                disabled: isSubmitting,
                ...register("accountName"),
                placeholder: "نام صاحب کارت",
              }}
            />
          </Grid>
          {/* Card Number Field =================================== > */}
          <Grid size={{ xs: 12, lg: edit ? 6 : 4 }}>
            <AccountInput
              control={control}
              errorText={errors?.["cardNumber"]?.message}
              disabled={isSubmitting}
              placeholder="شماره کارت (۱۶ رقم)"
            />
          </Grid>
          {/* Current Balance Field =================================== > */}
          {!edit && (
            <Grid size={{ xs: 12, lg: 4 }}>
              <MuiTextField
                errorText={errors?.["currentBalance"]?.message}
                textFieldProps={{
                  disabled: isSubmitting,
                  ...register("currentBalance", { valueAsNumber: true }),
                  placeholder: "مجودی فعلی حساب",
                }}
              />
            </Grid>
          )}
        </Grid>
        {/* Submit Button ===================== > */}
        <Box sx={{ mt: "20px" }}>
          {(edit ? isDirty : true) && (
            <Button
              disabled={isSubmitting}
              size="large"
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", _700: "fit-content" } }}
            >
              {edit ? "ثبت تغیرات" : "ثبت کارت جدید"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AccountForm;

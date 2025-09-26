import { MuiButton, MuiSelectInput, MuiTextField } from "@/components/ui";
import { editUserSchema } from "@/lib/validations/userSchema";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function UserEditForm() {
  // * Form Handler ======================== >
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(editUserSchema),
  });

  // * Submiter ======================== >
  const submiter = async () => {};

  // * style ================ >
  const { palette } = useTheme();
  return (
    <>
      {/* Form ====================== > */}
      <Box onSubmit={handleSubmit(submiter)} component={"form"}>
        <Grid container spacing={2}>
          {/* FullName Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["fullName"]?.message}
              textFieldProps={{
                ...register("fullName"),
                placeholder: "نام کامل",
              }}
            />
          </Grid>
          {/* Username Field ================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["userName"]?.message}
              textFieldProps={{
                ...register("userName"),
                placeholder: "نام کاربری",
              }}
            />
          </Grid>
          {/* Email Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["email"]?.message}
              textFieldProps={{
                ...register("email"),
                placeholder: "ایمیل",
              }}
            />
          </Grid>
          {/* Phone Field =================================== > */}
          <Grid size={4}>
            <MuiTextField
              errorText={errors?.["phone"]?.message}
              textFieldProps={{
                ...register("phone"),
                placeholder: "شماره تماس",
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
            {"ثبت تغیرات"}
          </MuiButton>
        </Box>
      </Box>
    </>
  );
}

export default UserEditForm;

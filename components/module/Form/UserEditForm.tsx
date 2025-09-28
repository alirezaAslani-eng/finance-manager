import { MuiButton, MuiSelectInput, MuiTextField } from "@/components/ui";
import { editUserSchema } from "@/lib/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, useTheme } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function UserEditForm() {
  const [isEditable, setIseditable] = useState(false);
  // * Form Handler ======================== >
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: "alirezaaslani@gmail.com",
      userName: "ali-username",
      fullName: "alireza",
      phone: "09130883665",
    },
  });

  // * Submiter ======================== >
  const submiter = async () => {};

  // * Style ====================== >
  const theme = useTheme();
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
                disabled: !isEditable || isSubmitting,
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
                disabled: !isEditable || isSubmitting,
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
                disabled: !isEditable || isSubmitting,
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
                disabled: !isEditable || isSubmitting,
                ...register("phone"),
                placeholder: "شماره تماس",
              }}
            />
          </Grid>
        </Grid>

        {/* Submit Button ===================== > */}
        <Box sx={{ mt: "20px" }}>
          {isEditable && (
            <MuiButton
              buttonProps={{
                size: "large",
                sx: { fontSize: "18px" },
                type: "submit",
              }}
            >
              {"ثبت تغیرات"}
            </MuiButton>
          )}
          {!isEditable && (
            <MuiButton
              buttonProps={{
                onClick: () => setIseditable(true),
                size: "large",
                sx: {
                  fontSize: "18px",
                  ...theme.custom.resetButton,
                  p: "10px",
                  borderRadius: "999px",
                },
                type: "button",
              }}
            >
              <ModeEditRoundedIcon />
            </MuiButton>
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserEditForm;

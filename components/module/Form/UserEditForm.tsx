import { MuiTextField } from "@/components/ui";
import { editUserSchema } from "@/lib/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function UserEditForm() {
  // * Form Handler ======================== >
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
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

  return (
    <>
      {/* Form ====================== > */}
      <Box onSubmit={handleSubmit(submiter)} component={"form"}>
        <Grid container spacing={2}>
          {/* FullName Field =================================== > */}
          <Grid size={{ xs: 12, _600: 6 }}>
            <MuiTextField
              errorText={errors?.["fullName"]?.message}
              textFieldProps={{
                ...register("fullName"),
                placeholder: "نام کامل",
              }}
            />
          </Grid>
          {/* Username Field ================== > */}
          <Grid size={{ xs: 12, _600: 6 }}>
            <MuiTextField
              errorText={errors?.["userName"]?.message}
              textFieldProps={{
                ...register("userName"),
                placeholder: "نام کاربری",
              }}
            />
          </Grid>
          {/* Email Field =================================== > */}
          <Grid size={{ xs: 12, _600: 6 }}>
            <MuiTextField
              errorText={errors?.["email"]?.message}
              textFieldProps={{
                ...register("email"),
                placeholder: "ایمیل",
              }}
            />
          </Grid>
          {/* Phone Field =================================== > */}
          <Grid size={{ xs: 12, _600: 6 }}>
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

        <Button
          sx={{ mt: "20px" }}
          size="large"
          type="submit"
          variant="contained"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "صبر کنید ..." : "ثبت تغیرات"}
        </Button>
      </Box>
    </>
  );
}

export default UserEditForm;

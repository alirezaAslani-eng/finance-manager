import React from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import { muiTheme } from "@/utils";
import { useForm } from "react-hook-form";
import { MuiButton, MuiTextField } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { initSchema } from "@/lib/validations";
import type { BoxProps } from "@mui/material";
import type { InitSchemaType } from "@/lib/validations/initSchema";

interface MyPropa {
  formContainerProps?: BoxProps;
  onSubmit?: (data: InitSchemaType) => Promise<void>;
}
const InitForm=({ formContainerProps = {}, onSubmit }: MyPropa)=> {
  // * Form Config ================== >
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(initSchema) });

  // * Style =================== >
  const {
    palette: { mode, grey },
  } = useTheme();
  const TitleColor = muiTheme(mode, {
    dark: grey[50],
    light: grey[800],
  });

  // * Events ======== >
  const submiter = async (data: unknown) => {
    onSubmit && (await onSubmit(data as InitSchemaType));
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submiter)}
      {...formContainerProps}
      sx={{
        width: "100%",
        animation: "fade-down ease 1s forwards",
        ...formContainerProps?.sx,
      }}
    >
      {/* // * Account input =================== > */}
      <Typography
        color={TitleColor}
        sx={{ mb: "10px", fontSize: { xs: "20px" } }}
      >
        اطلاعات کارت
      </Typography>
      <Box sx={{ mb: "20px" }}>
        <Stack spacing={2}>
          <MuiTextField
            errorText={errors?.["accountName"]?.message}
            textFieldProps={{
              ...register("accountName"),
              placeholder: "نام صاحب کارت",
              fullWidth: true,
            }}
          />
          <MuiTextField
            errorText={errors?.["cardNumber"]?.message}
            textFieldProps={{
              ...register("cardNumber"),
              label: "شماره کارت",
              placeholder: "شماره کارت (۱۶ رقم)",
              fullWidth: true,
            }}
          />
          <MuiTextField
            errorText={errors?.["currentBalance"]?.message}
            textFieldProps={{
              ...register("currentBalance", { valueAsNumber: true }),
              label: "مجودی فعلی",
              placeholder: "به (تومان)",
              fullWidth: true,
            }}
          />
        </Stack>
      </Box>
      {/* // * Category input =================== > */}
      <Typography
        color={TitleColor}
        sx={{ mb: "10px", fontSize: { xs: "20px" } }}
      >
        {"دسته بندی دلخواه"}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <MuiTextField
          errorText={errors?.["categoryName"]?.message}
          textFieldProps={{
            ...register("categoryName"),
            placeholder: "مثلا (خرج خونه , سلامت , تفریح)",
            label: "دسته بندی",
            fullWidth: true,
          }}
        />
      </Box>
      {/* // * Submit input =================== > */}
      <Box textAlign="center">
        <MuiButton
          buttonProps={{
            type: "submit",
            variant: muiTheme<"contained" | "outlined">(mode, {
              light: "contained",
              dark: "outlined",
            }),
            size: "large",
          }}
        >
           {"ادامه و ورود"}
        </MuiButton>
      </Box>
    </Box>
  );
}

export default InitForm;

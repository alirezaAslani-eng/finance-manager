import { MuiSelectInput, MuiTextField, SwitchButton } from "@/components/ui";
import { AuthContex, ModalContext } from "@/context";
import { transactionSchema } from "@/lib/validations";
import type { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

interface MyProps {
  onSubmit?: (info: transactionSchemaType) => Promise<void> | void;
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
      category: "", // * to fix uncontroled warn
    },
  });

  // * Auth Context to access to user's accounts and categories ==================== >
  const {
    userInfo: { accounts, categories },
    isAuthing,
  } = useContext(AuthContex)!;

  // * Auto Fill input ==== >
  useEffect(() => {
    setValue("account", accounts.find((item) => item.isActive)?._id || "");
  }, [accounts]);

  // * Submiter ======================== >
  const submiter = async (form: unknown) => {
    await onSubmit(form as transactionSchemaType);
  };

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
          <Grid size={{ xs: 12, _600: 6 }}>
            <MuiTextField
              errorText={errors?.["amount"]?.message}
              textFieldProps={{
                disabled: isSubmitting,
                ...register("amount", { valueAsNumber: true }),
                placeholder: "مقدار تراکنش",
              }}
            />
          </Grid>
          {/* Category Field =================================== > */}
          <Grid size={{ xs: 12, _600: 6 }}>
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
                      disabled: isAuthing || isSubmitting,
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
        <input type="hidden" {...register("account")} />
        {/* Submit Button ===================== > */}
        <Box gap={"12px"} display={"flex"} mt={"12px"}>
          <Button
            color="success"
            variant="contained"
            size="large"
            type="submit"
            onClick={() => {
              setValue("type", "1");
            }}
          >
            {"واریز"}
          </Button>
          <Button
            color="error"
            variant="contained"
            size="large"
            type="submit"
            onClick={() => {
              setValue("type", "0");
            }}
          >
            {"برداشت"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TransactionForm;

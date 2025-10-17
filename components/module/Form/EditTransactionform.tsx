import {
  MuiAlert,
  MuiButton,
  MuiSelectInput,
  MuiTextField,
} from "@/components/ui";
import { AuthContex } from "@/context";
import { transactionEditSchema } from "@/lib/validations";
import { transactionEditSchemaType } from "@/lib/validations/transactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

interface MyProps {
  defaultValues: transactionEditSchemaType;
  onSubmit?: (info: transactionEditSchemaType) => Promise<void>;
}

function EditTransactionform({
  defaultValues = { category: "", reason: "" },
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
    userInfo: { categories },
  } = useContext(AuthContex)!;
  const categoryOptions = useMemo(() => {
    return categories.map((cat) => {
      return { text: cat.name, value: cat._id };
    });
  }, [categories]);

  // * submiter ================= >
  const submit = async (f: unknown) => {
    await onSubmit(f as transactionEditSchemaType);
    reset(getValues());
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submit)}
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* // * Category field ============== >>> */}
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
      {/* // * Reason field ============== >>> */}
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
      <Box sx={{ mt: "20px" }}>
        {/* // * Warning =============== > */}
        <MuiAlert
          text={
            "برای ویرایش نوع تراکنش یا  مبلغ تراکنش لطفا تراکنش را پاک کرده و از اول ایجاد کنید. این مشکل به زودی برطرف خواهد شد ."
          }
        />
        {/* // TODO show confrim modla to delete and navigate user */}
        <MuiButton
          buttonProps={{
            disabled: isSubmitting,
            variant: "text",
            color: "error",
            size: "large",
            sx: {
              gap: "10px",
              mt: "10px",
            },
          }}
        >
          {"حذف و ایجاد یک تراکنش جدید"}
          <ArrowBackRoundedIcon />
        </MuiButton>
      </Box>
    </Box>
  );
}

export default EditTransactionform;

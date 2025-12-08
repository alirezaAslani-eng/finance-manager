import { MuiSelectInput, MuiTextField } from "@/components/ui";
import { AuthContex, ModalContext } from "@/context";
import { transactionEditSchema } from "@/lib/validations";
import { transactionEditSchemaType } from "@/lib/validations/transactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

interface MyProps {
  defaultValues: transactionEditSchemaType;
  onSubmit?: (info: transactionEditSchemaType) => Promise<void>;
  isLatestTransaction?: boolean;
}

function EditTransactionform({
  defaultValues = {
    category: "",
    reason: "",
    amount: 0,
    type: "1",
  },
  isLatestTransaction,
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
    userInfo: { categories, accounts },
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

  // * Modal Context to open edit category modal ==== >
  const { openEditCategoryModal } = useContext(ModalContext)!;
  const editCategoryOptionClick = (categoryId: string) => {
    openEditCategoryModal({ categoryId });
  };
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit(submit)}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Grid container spacing={2}>
          {/* // * Category field ============== >>> */}
          <Grid size={{ xs: 12, _700: 6 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                return (
                  <MuiSelectInput
                    isEditable
                    onEditOption={editCategoryOptionClick}
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
          </Grid>
          {/* // * Amount field ============== >>> */}
          <Grid size={{ xs: 12, _700: 6 }}>
            <MuiTextField
              errorText={errors?.["amount"]?.message}
              textFieldProps={{
                disabled: !isLatestTransaction ? true : isSubmitting,
                ...register("amount", { valueAsNumber: true }),
                placeholder: "مقدار تراکنش",
              }}
            />
          </Grid>
          {/* // * Reason field ============== >>> */}
          <Grid size={12}>
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
          </Grid>
        </Grid>
        {/* // * Edit Type Button ========= >  */}
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <ToggleButtonGroup
                {...field}
                disabled={!isLatestTransaction ? true : isSubmitting}
              >
                <ToggleButton value="1" color="success">
                  {"واریز"}
                </ToggleButton>
                <ToggleButton value="0" color="error">
                  {"برداشت"}
                </ToggleButton>
              </ToggleButtonGroup>
            );
          }}
        />

        {/* // * Submit button ================== > */}
        {isDirty && (
          <Button
            disabled={isSubmitting}
            size="large"
            type="submit"
            variant="contained"
            sx={{ width: { xs: "100%", sm: "fit-content" } }}
          >
            {isSubmitting ? "در حال ویرایش" : "ویرایش"}
          </Button>
        )}
      </Box>
    </>
  );
}

export default EditTransactionform;

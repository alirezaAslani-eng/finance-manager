import { MuiTextField, AdaptiveScroll } from "@/components/ui";
import { useAuth } from "@/context";
import { usePaginationArray } from "@/hooks";
import { createCategorySchema } from "@/lib/validations";
import { CreateCategorySchemaType } from "@/lib/validations/types";
import { dana_md } from "@/utils/font";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SxProps } from "@mui/material/styles";
import React from "react";
import { useForm } from "react-hook-form";

const category_row: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

interface MyProps {
  onSubmit?: (categoryInfo: CreateCategorySchemaType) => Promise<void>;
  onClose?: () => void;
  edit?: boolean;
  defaultValues?: CreateCategorySchemaType;
}
function CategoryModalForm({
  onSubmit = async () => {},
  edit = false,
  defaultValues,
  onClose,
}: MyProps) {
  // * Input Config =================== >
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ resolver: zodResolver(createCategorySchema()), defaultValues });

  // * MUI Theme ============= >
  const { palette, alpha } = useTheme();

  // * Context to use user's caterories =========== >
  const {
    userInfo: { categories },
  } = useAuth();

  // * Cut array of categories =============== >
  const { pagedData: halfedCategories } = usePaginationArray(
    categories?.length ? categories : [],
    {
      per: Math.ceil(categories.length / 2),
    }
  );

  // * Breake Points ================= >
  const is_after_540 = useMediaQuery((tm) => tm.breakpoints.up("_540"));

  // * Submiter Method ================ >
  const submiter = async (f: unknown) => {
    await onSubmit(f as CreateCategorySchemaType);
  };
  return (
    <>
      <Box
        className={dana_md.className || ""}
        component={"form"}
        sx={{
          background: palette.background.default,
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        {/* // * Submit & Cancel Button =================== > */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            disabled={edit ? isSubmitting || !isDirty : isSubmitting}
            onClick={handleSubmit(submiter)}
            type="button"
            variant="contained"
          >
            {edit
              ? isSubmitting
                ? "در حال ویرایش"
                : "ویرایش"
              : isSubmitting
              ? "در حال ایجاد"
              : "ایجاد دسته بندی"}
          </Button>
          <Button onClick={onClose} color="error" disabled={isSubmitting}>
            لغو
          </Button>
        </Box>
        {/* // * Text  ==== >>> */}
        <Box sx={{ mt: "20px", textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "16px",
                sm: "22px",
              },
              color: muiTheme(palette.mode, {
                light: alpha(palette.grey[800], 0.9),
                dark: alpha(palette.grey[50], 0.9),
              }),
            }}
          >
            {edit
              ? "در صورت تغیر نام دسته بندی برای تراکنش ها هم تغیر خواهد کرد"
              : "برای تراکنش ها میتوانید از دسته بندی هایی مثل امور خانه, تفریح, بدهی استفاده کنید"}
          </Typography>
        </Box>
        {/* // * Input =============== > */}
        <MuiTextField
          errorText={errors?.["name"]?.message}
          textFieldProps={{
            disabled: isSubmitting,
            ...register("name"),
            sx: { mt: "20px" },
            placeholder: "دسته بندی (هزینه منزل, تفریح, سلامت)",
            label: "دسته بندی جدید",
          }}
        />
        {/* // * Created Categories  ====================== >*/}
        {!!categories.length && (
          <>
            <Typography mt={"20px"}>{"دسته بندی های شما"}</Typography>
            <AdaptiveScroll>
              {/* // * Desktop Section =========== > */}
              {is_after_540 &&
                categories.map((item) => {
                  return <Chip key={item._id} label={item.name} />;
                })}

              {/* // * Mobile Section =========== > */}
              {!is_after_540 && (
                <>
                  <Box sx={category_row}>
                    {halfedCategories?.[0]?.length &&
                      halfedCategories[0].map((item) => {
                        return <Chip key={item._id} label={item.name} />;
                      })}
                  </Box>
                  <Box sx={category_row}>
                    {halfedCategories?.[1]?.length &&
                      halfedCategories[1].map((item) => {
                        return <Chip key={item._id} label={item.name} />;
                      })}
                  </Box>
                </>
              )}
            </AdaptiveScroll>
          </>
        )}
      </Box>
    </>
  );
}

export default CategoryModalForm;

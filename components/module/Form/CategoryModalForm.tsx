import {
  DeletableChip,
  MuiButton,
  MuiTextField,
  ScrollShadowBox,
} from "@/components/ui";
import { AuthContex } from "@/context";
import { useBreakePoints, usePaginationArray } from "@/hooks";
import { categorySchema } from "@/lib/validations";
import { CategorySchemaType } from "@/lib/validations/categorySchema";
import { danaMediume } from "@/pages/_app";
import { muiTheme } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material/styles";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

// * Categories container
const categories_container: SxProps = {
  display: "flex",
  flexDirection: { xs: "column", _540: "row" },
  flexWrap: {
    xs: "nowrap",
    _540: "wrap",
  },

  mt: "10px",
  gap: "8px",
  maxHeight: "200px",
};
const category_row: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

interface MyProps {
  onSubmit?: (categoryInfo: CategorySchemaType) => Promise<void>;
  edit?: boolean;
  defaultValues?: CategorySchemaType;
}
function CategoryModalForm({
  onSubmit = async () => {},
  edit = false,
  defaultValues,
}: MyProps) {
  // * Input Config =================== >
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ resolver: zodResolver(categorySchema), defaultValues });

  // * MUI Theme ============= >
  const { palette, alpha } = useTheme();

  // * Context to use user's caterories =========== >
  const {
    userInfo: { categories },
  } = useContext(AuthContex)!;

  // * Cut array of categories =============== >
  const { pagedData: halfedCategories } = usePaginationArray(
    categories?.length ? categories : [],
    {
      per: Math.ceil(categories.length / 2),
    }
  );

  // * Breake Points ================= >
  const { is_after_540 } = useBreakePoints();

  // * Submiter Method ================ >
  const submiter = async (f: unknown) => {
    await onSubmit(f as CategorySchemaType);
  };
  return (
    <>
      <Box
        className={danaMediume.className || ""}
        component={"form"}
        sx={{
          background: palette.background.default,
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "450px",
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
          <MuiButton
            buttonProps={{
              onClick: handleSubmit(submiter),
              disabled: edit ? isSubmitting || !isDirty : isSubmitting,
            }}
          >
            {edit
              ? isSubmitting
                ? "در حال ویرایش"
                : "ویرایش"
              : isSubmitting
              ? "در حال ایجاد"
              : "ایجاد دسته بندی"}
          </MuiButton>
          <MuiButton
            buttonProps={{
              variant: "text",
              color: "error",
              disabled: isSubmitting,
            }}
          >
            لغو
          </MuiButton>
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
            <ScrollShadowBox
              xScroll={!is_after_540}
              yScroll={is_after_540}
              boxProps={{ sx: categories_container }}
            >
              {/* // * Desktop Section =========== > */}
              {is_after_540 &&
                categories.map((item) => {
                  return <DeletableChip key={item._id} text={item.name} />;
                })}
              {/* // * Mobile Section =========== > */}
              {!is_after_540 && (
                <>
                  <Box sx={category_row}>
                    {halfedCategories?.[0]?.length &&
                      halfedCategories[0].map((item) => {
                        return (
                          <DeletableChip key={item._id} text={item.name} />
                        );
                      })}
                  </Box>
                  <Box sx={category_row}>
                    {halfedCategories?.[1]?.length &&
                      halfedCategories[1].map((item) => {
                        return (
                          <DeletableChip key={item._id} text={item.name} />
                        );
                      })}
                  </Box>
                </>
              )}
            </ScrollShadowBox>
          </>
        )}
      </Box>
    </>
  );
}

export default CategoryModalForm;

import { MuiTextField } from "@/components/ui";
import { muiTheme } from "@/utils";
import { alpha, CSSProperties, useTheme } from "@mui/material";
import React from "react";

function TopBarSearchBox() {
  const { palette } = useTheme();

  const borderAndLabel_color = muiTheme(palette.mode, {
    light: palette.grey[300],
    dark: palette.primary.main,
  });
  return (
    <MuiTextField
      textFieldProps={{
        size: "small",
        placeholder: "جستجو",
        sx: {
          // * Border ============= >
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderAndLabel_color,
          },
          // * Label ============== >
          "& .MuiInputLabel-root": {
            color: borderAndLabel_color,
          },
          // * Label Focused ====================== >
          "& .MuiInputLabel-root.Mui-focused": {
            color: borderAndLabel_color,
          },
          // * Border Focused ================ >
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: borderAndLabel_color,
            },
          ".MuiOutlinedInput-input::placeholder": {
            color: muiTheme(palette.mode, {
              light: palette.grey[900],
              dark: palette.grey[100],
            }),
          },
        },
      }}
    />
  );
}

export default TopBarSearchBox;

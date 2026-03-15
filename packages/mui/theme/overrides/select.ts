import { Components, Theme } from "@mui/material/styles";
import { sharedInputStyle } from "./shared";

const select = {
  defaultProps: {
    fullWidth: true,
  },

  styleOverrides: {
    root: {
      borderRadius: sharedInputStyle.borderRadius,
      ["& .MuiSvgIcon-root"]: {
        display: "none",
      },
      ["& .MuiSelect-select"]: {
        paddingRight: "14px !important",
      },
    },
  },
} satisfies Components<Theme>["MuiSelect"];

export default select;

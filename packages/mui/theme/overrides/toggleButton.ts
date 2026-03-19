import { Components, Theme } from "@mui/material/styles";
import { sharedInputStyle } from "./shared";

const toggleButton = {
  styleOverrides: {
    root: {
      ":first-child": {
        borderTopLeftRadius: sharedInputStyle.borderRadius,
        borderBottomLeftRadius: sharedInputStyle.borderRadius,
      },
      ":last-child": {
        borderTopRightRadius: sharedInputStyle.borderRadius,
        borderBottomRightRadius: sharedInputStyle.borderRadius,
      },
    },
  },
} satisfies Components<Theme>["MuiToggleButton"];

export default toggleButton;

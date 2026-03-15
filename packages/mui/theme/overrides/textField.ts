import { Components, Theme } from "@mui/material/styles";
import { sharedInputStyle } from "./shared";

const textField = {
  defaultProps: {
    fullWidth: true,
  },

  styleOverrides: {
    root: {
      ["& .MuiOutlinedInput-root"]: {
        borderRadius: sharedInputStyle.borderRadius,
        height: "100%",
      },
    },
  },
} satisfies Components<Theme>["MuiTextField"];

export default textField;

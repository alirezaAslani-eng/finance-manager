import { Components, Theme } from "@mui/material/styles";

const formControl = {
  defaultProps: {
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      "& label": {
        right: 0,
        top: 0,
        width: "fit-content",
        transform: "translate(-14px , 16px)",
      },
      "& label.MuiInputLabel-sizeSmall": {
        transform: "translate(-14px , 9px)",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(-14px , -9px) !important",
      },
      "& fieldset legend": {
        direction: "rtl",
        textAlign: "right",
        fontFamily: "inherit",
        fontSize: "unset",
      },
    },
  },
} satisfies Components<Theme>["MuiFormControl"];

export default formControl;

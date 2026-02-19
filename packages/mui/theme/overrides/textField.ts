import { Components, Theme } from "@mui/material/styles";

const textField = {
  defaultProps: {
    fullWidth: true,
    lang: "fa",
    dir: "rtl",
  },

  styleOverrides: {
    root: {
      ["& .MuiOutlinedInput-root"]: {
        borderRadius: "16px",
        height: "100%",
      },

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
} satisfies Components<Theme>["MuiTextField"];

export default textField;

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
    },
  },
} satisfies Components<Theme>["MuiTextField"];

export default textField;

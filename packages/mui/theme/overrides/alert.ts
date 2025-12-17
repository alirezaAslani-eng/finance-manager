import { Components, Theme } from "@mui/material/styles";

const alert = {
  styleOverrides: {
    root: {
      borderRadius: "14px",
    },
  },
  defaultProps: {
    slotProps: {
      icon: {
        style: {
          marginRight: "0",
          marginLeft: "10px",
        },
      },
    },
  },
} satisfies Components<Theme>["MuiAlert"];

export default alert;

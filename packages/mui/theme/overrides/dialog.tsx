import { Components, Theme } from "@mui/material";

const dialog = {
  defaultProps: { fullWidth: true, "aria-hidden": false },
  styleOverrides: {
    paper: {
      borderRadius: "18px",
      backgroundImage: "unset",
    },
  },
} satisfies Components<Theme>["MuiDialog"];

export default dialog;

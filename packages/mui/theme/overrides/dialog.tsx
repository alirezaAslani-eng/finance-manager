import { Components, Theme } from "@mui/material";

const dialog = {
  defaultProps: { fullWidth: true, "aria-hidden": false },
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: "18px",
      backgroundImage: "unset",
      ...(theme.custom!.noScroll as object),
    }),
  },
} satisfies Components<Theme>["MuiDialog"];

export default dialog;

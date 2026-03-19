import { Components, Theme } from "@mui/material/styles";

const paper = {
  styleOverrides: {
    root: {
      backgroundImage: "unset",
    },
  },
} satisfies Components<Theme>["MuiPaper"];

export default paper;

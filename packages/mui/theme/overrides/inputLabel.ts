import { Theme, Components } from "@mui/material/styles";

const inputLabel = {
  styleOverrides: {
    root: {
      cursor: "pointer",
    },
  },
} satisfies Components<Theme>["MuiInputLabel"];

export default inputLabel;

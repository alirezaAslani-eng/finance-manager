import type { Components, Theme } from "@mui/material/styles";
import { CSSProperties } from "react";

const cssBaseLine = {
  styleOverrides: {
    a: {
      ["&"]: {
        color: "inherit",
        textDecoration: "none",
      } satisfies CSSProperties,
    },
  },
} satisfies Components<Theme>["MuiCssBaseline"];

export default cssBaseLine;

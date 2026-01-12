import {
  TypographyStyle,
  TypographyVariantsOptions,
} from "@mui/material/styles";
import palette from "./palette";

const typography: TypographyVariantsOptions = {
  fontFamily: "var(--dana-md)",
  base: { fontSize: "16px", fontFamily: "var(--dana-md)" },
  xs: { fontSize: "12px", fontFamily: "var(--dana-md)" },
  sm: { fontSize: "14px", fontFamily: "var(--dana-md)" },
  lg: { fontSize: "18px", fontFamily: "var(--dana-md)" },
  xl: {
    fontSize: "20px",
    fontFamily: "var(--peyda-md)",
  },
  "2xl": {
    fontSize: "28px",
    fontFamily: "var(--peyda-md)",
  },
  "3xl": { fontSize: "32px", fontFamily: "var(--peyda-md)" },
  "4xl": { fontSize: "36px", fontFamily: "var(--peyda-md)" },
  subtitle1: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
};

export default typography;

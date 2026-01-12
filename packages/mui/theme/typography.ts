import { TypographyVariantsOptions } from "@mui/material/styles";

const typography: TypographyVariantsOptions = {
  fontFamily: "var(--dana-md)",
  base: { fontSize: "16px" },
  xs: { fontSize: "12px" },
  sm: { fontSize: "14px" },
  lg: { fontSize: "18px" },
  xl: { fontSize: "20px" },
  "2xl": { fontSize: "28px" },
  "3xl": { fontSize: "32px" },
  "4xl": { fontSize: "36px" },
  subtitle1: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
};

export default typography;

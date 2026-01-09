import { TypographyVariantsOptions } from "@mui/material/styles";

const typography: TypographyVariantsOptions = {
  fontFamily: "var(--dana-md)",
  fontSizes: {
    base: "16px",
    xs: "12px",
    sm: "14px",
    lg: "18px",
    xl: "20px",
    "2xl": "28px",
    "3xl": "32px",
    "4xl": "36px",
  },
  subtitle1: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  },
};

export default typography;

import "@mui/material/Button";
import "@mui/material/Typography";
import { FontSizes } from "./theme.types";
/**
 * Augment Button types
 */
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    /**
     * "text-grey" is the same as "text" variant but it has a grey theme
     */
    "text-grey": true;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "xl-title": true;
    "2xl-title": true;
    "md-paragraph": true;
    base: true;
    xs: true;
    sm: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
    "4xl": true;
  }
}

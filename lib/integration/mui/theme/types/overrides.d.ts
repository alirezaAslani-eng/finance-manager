import "@mui/material/Button";
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

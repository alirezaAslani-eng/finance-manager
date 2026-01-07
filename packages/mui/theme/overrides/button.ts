import { muiTheme } from "@/packages/mui";
import { Components, Theme } from "@mui/material";
import palette from "../palette";

const button = {
  styleOverrides: {
    root: {
      // * not uppercase
      textTransform: "none",
      /**
       * Custom Variants
       */
      variants: [
        // * text-grey variant is like text but with grey color
        {
          props: { variant: "text-grey" },
          style: ({
            theme: {
              alpha,
              palette: { mode, grey },
            },
          }) => {
            // * color ================ >
            const color = muiTheme(mode, {
              light: grey[700],
              dark: grey[100],
            });
            // * Style ============== >
            return {
              border: "none",
              color,
              ":hover": {
                backgroundColor: alpha(color, 0.2),
              },
            };
          },
        },
      ],
    },
    /**
     * Info Button ===================== >
     */
    containedSuccess: {
      // * button with green background always have a white color === >
      color: palette.grey![50],
    },
    /**
     * SMALL MEDIUM LARG ======================= >
     */
    sizeSmall: {
      height: "32px",
      padding: "0px 12px",
      fontSize: "14px",
      borderRadius: "12px",
    },
    sizeMedium: {
      height: "40px",
      padding: "0px 16px",
      fontSize: "16px",
      borderRadius: "14px",
    },
    sizeLarge: {
      height: "48px",
      padding: "0px 20px",
      fontSize: "16px",
      borderRadius: "16px",
    },
  },
} satisfies Components<Theme>["MuiButton"];

export default button;

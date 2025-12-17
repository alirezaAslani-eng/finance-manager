import { Components, Theme } from "@mui/material/styles";

const svgIcon = {
  defaultProps: {
    fontSize: "large",
  },
  styleOverrides: {
    fontSizeMedium: {
      fontSize: "18px",
    },
    fontSizeSmall: {
      fontSize: "20px",
    },
    fontSizeLarge: {
      fontSize: "22px",
    },
  },
} satisfies Components<Theme>["MuiSvgIcon"];

export default svgIcon;

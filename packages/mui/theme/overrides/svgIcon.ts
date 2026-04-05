import { Components, Theme } from "@mui/material/styles";
import { muiTheme } from "../helpers";

const svgIcon = {
  defaultProps: {
    fontSize: "large",
    cursor: "pointer",
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
    colorAction: ({ theme: { palette } }) => {
      return {
        color: muiTheme(palette.mode, {
          light: palette.grey[700],
          dark: palette.grey[300],
        }),
      };
    },
  },
} satisfies Components<Theme>["MuiSvgIcon"];

export default svgIcon;

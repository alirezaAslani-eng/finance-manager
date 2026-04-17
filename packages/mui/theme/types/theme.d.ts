import type { SxProps, Theme } from "@mui/material/styles";
import { CustomStyle, FontSizes, Shades } from "./theme.types";

type CustomPaletteColors = Record;
declare module "@mui/material/styles" {
  interface PaletteColor extends Shades {}
  interface SimplePaletteColorOptions extends Shades {}
  interface Palette {
    black: Shades;
    white: Shades;
    blue: Shades;
    darkBackground: string;
    darkPaper: string;
  }
  interface PaletteOptions {
    black?: Shades;
    white?: Shades;
    blue?: Shades;
    darkBackground?: string;
    darkPaper?: string;
  }
  interface Theme {
    custom?: CustomStyle;
  }
  interface ThemeOptions {
    custom?: CustomStyle;
  }

  interface TypographyVariantsOptions extends FontSizes {}
  interface TypographyVariants extends FontSizes {}

  interface BreakpointOverrides {
    _360: true;
    _700: true;
    _600: true;
    _540: true;
    _1350: true;
  }
}

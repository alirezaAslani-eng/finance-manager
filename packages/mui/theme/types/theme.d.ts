import type { SxProps, Theme } from "@mui/material/styles";
import { CustomStyle, FontSizes, Shades } from "./theme.types";

declare module "@mui/material/styles" {
  interface PaletteColor extends Shades {}
  interface SimplePaletteColorOptions extends Shades {}
  interface Palette {
    black: string;
    white: string;
  }
  interface PaletteOptions {
    black?: string;
    white?: string;
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

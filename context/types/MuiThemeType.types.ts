import type {
  Palette,
  PaletteColor,
  SimplePaletteColorOptions,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";

interface Shades {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}
interface CustomStyle {
  resetButton: {
    minHeight: "0px";
    minWidth: "0px";
    padding: "0px";
  };
}
declare module "@mui/material/styles" {
  interface PaletteColor extends Shades {}
  interface SimplePaletteColorOptions extends Shades {}
  interface Theme {
    custom: CustomStyle;
  }
  interface ThemeOptions {
    custom: CustomStyle;
  }
  interface BreakpointOverrides {
    _700: true;
    _600: true;
  }
}

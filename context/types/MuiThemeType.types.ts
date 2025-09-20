import type {
  Palette,
  PaletteColor,
  SimplePaletteColorOptions,
  PaletteOptions,
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
declare module "@mui/material/styles" {
  interface PaletteColor extends Shades {}
  interface SimplePaletteColorOptions extends Shades {}
  interface Palette {
    white: Shades;
  }
  interface PaletteOptions {
    white: Shades;
  }
}

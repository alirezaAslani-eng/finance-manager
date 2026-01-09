import type { SxProps, Theme } from "@mui/material/styles";

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
interface FontSizes {
  base?: string;
  xs?: string;
  sm?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
  "4xl"?: string;
}

/**
 * Customized reusable styles
 */
interface CustomStyle {
  circleButton: SxProps<Theme>;
  noScroll: SxProps<Theme>;
}

declare module "@mui/material/styles" {
  interface PaletteColor extends Shades {}
  interface SimplePaletteColorOptions extends Shades {}

  interface Theme {
    custom?: CustomStyle;
  }
  interface ThemeOptions {
    custom?: CustomStyle;
  }

  interface TypographyVariantsOptions {
    fontSizes?: FontSizes;
  }
  interface TypographyVariants {
    fontSizes?: FontSizes;
  }

  interface BreakpointOverrides {
    _700: true;
    _600: true;
    _540: true;
    _1350: true;
  }
}

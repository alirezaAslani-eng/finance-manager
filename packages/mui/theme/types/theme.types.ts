import { Theme } from "@emotion/react";
import type { SxProps, TypographyStyle } from "@mui/material";

type ThemeMode = "dark" | "light";

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
  base?: TypographyStyle;
  xs?: TypographyStyle;
  sm?: TypographyStyle;
  lg?: TypographyStyle;
  xl?: TypographyStyle;
  "2xl"?: TypographyStyle;
  "3xl"?: TypographyStyle;
  "4xl"?: TypographyStyle;
}

/**
 * Customized reusable styles
 */
interface CustomStyle {
  circleButton: SxProps<Theme>;
  noScroll: SxProps<Theme>;
}
export type { ThemeMode, CustomStyle, FontSizes, Shades };

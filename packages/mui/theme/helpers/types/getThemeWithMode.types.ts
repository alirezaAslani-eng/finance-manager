import { ThemeOptions } from "@mui/material";
import { ThemeMode } from "../../types";

interface Options {
  mode?: ThemeMode;
}
/**
 * A function that makes dynamic your theme based on mode status
 */
type GetThemeWithMode = (theme: ThemeOptions, options?: Options) => ThemeOptions;

export type { GetThemeWithMode };

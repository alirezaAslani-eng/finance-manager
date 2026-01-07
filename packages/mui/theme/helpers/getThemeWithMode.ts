import { muiTheme } from "@/packages/mui";
import { GetThemeWithMode } from "./types";

const getThemeWithMode: GetThemeWithMode = (theme, opt) => {
  const { mode = "dark" } = opt;
  return {
    ...theme,
    palette: {
      ...theme.palette,
      mode, // * override mode
      background: {
        ...theme.palette?.background,
        default: muiTheme(mode, { dark: "#121212", light: "#fff" }), // * override default background
      },
    },
  };
};

export default getThemeWithMode;

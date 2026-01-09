import { GetThemeWithMode } from "./types";

const getThemeWithMode: GetThemeWithMode = (theme, opt = {}) => {
  const { mode = "dark" } = opt;

  // * Read colors from theme object =============== >
  const default_mode = theme.palette?.background?.default;
  const dark_mode = theme.palette?.grey?.[900];

  return {
    ...theme,
    palette: {
      ...theme.palette,
      mode, // * override mode
      background: {
        ...theme.palette?.background,
        default: mode == "dark" ? dark_mode : default_mode, // * override default background
      },
    },
  };
};

export default getThemeWithMode;

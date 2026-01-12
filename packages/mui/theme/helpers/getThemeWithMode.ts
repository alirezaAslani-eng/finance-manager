import { GetThemeWithMode } from "./types";

const getThemeWithMode: GetThemeWithMode = (theme, opt = {}) => {
  const { mode = "dark" } = opt;

  // * Default Theme ==== >
  const background_default = theme.palette?.background?.default;
  const paper_default = theme.palette?.background?.paper;

  // * Dark Theme ==== >
  const background_dark = theme.palette?.black;
  const paper_dark = theme.palette?.grey?.[900];

  return {
    ...theme,
    palette: {
      ...theme.palette,
      mode, // * override mode
      background: {
        ...theme.palette?.background,
        default: mode == "dark" ? background_dark : background_default, // * override default background
        paper: mode == "dark" ? paper_dark : paper_default, // * override default paper
      },
    },
  };
};

export default getThemeWithMode;

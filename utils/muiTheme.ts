interface ThemeOptions {
  dark: string;
  light: string;
}

function muiTheme(mode: "dark" | "light", { dark, light }: ThemeOptions) {
  if (mode == "light") {
    return light;
  }
  return dark;
}

export default muiTheme;

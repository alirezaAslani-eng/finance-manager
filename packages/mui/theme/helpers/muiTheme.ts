interface ThemeOptions<T extends string> {
  dark: T;
  light: T;
}

function muiTheme<OutPutType extends string>(
  mode: "dark" | "light",
  { dark, light }: ThemeOptions<OutPutType>
): OutPutType {
  if (mode == "light") {
    return light as OutPutType;
  }
  return dark as OutPutType;
}

export default muiTheme;

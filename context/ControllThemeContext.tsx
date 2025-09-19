import { createTheme, ThemeProvider } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import {
  PropsWithChildren,
  useCallback,
  useState,
  createContext,
  useMemo,
} from "react";

type themeModeType = "dark" | "light";
interface ControllThemeProvider_face {
  changeMode: () => void;
  mode: "dark" | "light";
}

const ControllThemeContext = createContext({} as ControllThemeProvider_face);

function MuiThemeProvider({ children }: PropsWithChildren) {
  // * Mui Base Theme Configuration =============================== >

  // * == > theme mode state
  const [mode, setMode] = useState<themeModeType>("light");

  // * == > controll theme
  const changeMode = useCallback(() => {
    setMode((prev) => {
      if (prev == "dark") return "light";
      else if ((prev = "light")) return "dark";
      return "light";
    });
  }, []);

  // * == > MuiTheme
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: blue[500],
        },
        error: {
          main: red[500],
          300: red[300],
        },
      },
      typography: {
        fontFamily: "var(--dana-md)",
        h1: {
          fontFamily: "var(--peyda-md)",
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            a: {
              textDecoration: "none",
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ControllThemeContext value={{ changeMode, mode: mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ControllThemeContext>
  );
}

export { MuiThemeProvider, ControllThemeContext };

import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { blue, red, grey } from "@mui/material/colors";
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
      custom: {
        resetButton: {
          minHeight: "0px",
          minWidth: "0px",
          padding: "0px",
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          // * Custom needed breakepoints =========== >
          _700: 700,
          _600: 600,
        },
      },
      palette: {
        mode: mode,
        primary: {
          main: blue[500],
        },
        error: {
          main: red[500],
          300: red[300],
        },
        grey: {
          100: grey[100],
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

              ["&:active"]: {
                color: "transparent",
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ControllThemeContext value={{ changeMode, mode: mode }}>
      <GlobalStyles
        styles={`
        @keyframes opacity-appear {
        0%{
        box-shadow:0px 0px 0px 0px transparent;
        opacity:0;
        }
        50%{
         opacity:1;
        }
        100%{}
        }
        @keyframes fade-down {
        0%{
        transform: translateY(-30px);
        opacity:0;
        }
        100%{
        transform: translateY(0);       
        opacity:1;
        }
        }
        @keyframes fade-left {
        0%{
        transform: translateX(30px);
        opacity:0;
        }
        100%{
        transform: translateX(0)        
        opacity:1;
        }
        }
        `}
      />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ControllThemeContext>
  );
}

export { MuiThemeProvider, ControllThemeContext };

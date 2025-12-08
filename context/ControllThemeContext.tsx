import { muiTheme } from "@/utils";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { blue, red, grey } from "@mui/material/colors";
import { CSSProperties } from "@mui/material/styles";
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

  const theme = createTheme({
    spacing: 4, //  * << spacing(2) -> 8px
      custom: {
        resetButton: {
          minWidth: "0px",
          padding: "0px",
        aspectRatio: "1/1",
        borderRadius: "999px",
        },
        noScroll: {
          /* (Chrome, Edge, Safari) */
          "::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
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
          _1350: 1350,
          _700: 700,
          _600: 600,
          _540: 540,
        },
      },
      palette: {
        mode: mode,
        background: {
          default: muiTheme(mode, { light: "#fff", dark: "#121212" }),
        },
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
        subtitle1: {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            a: {
              ["&"]: {
                color: "inherit",
                textDecoration: "none",
              } as CSSProperties,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            // * custom variants
            variants: [
              {
                props: { variant: "text-grey" },
                style: ({
                  theme: {
                    alpha,
                    palette: { mode },
                  },
                }) => {
                  // * color ================ >
                  const color = muiTheme(mode, {
                    light: grey[700],
                    dark: grey[100],
                  });
                  // * Style ============== >
                  return {
                    border: "none",
                    color,
                    ":hover": {
                      backgroundColor: alpha(color, 0.2),
                    },
                  };
                },
              },
            ],
            },
            containedSuccess: {
              color: grey[50],
            },
          sizeSmall: {
            height: "32px",
            padding: "0px 12px",
            fontSize: "14px",
            borderRadius: "12px",
          },
          sizeMedium: {
            height: "40px",
            padding: "0px 16px",
            fontSize: "16px",
            borderRadius: "14px",
          },
          sizeLarge: {
            height: "48px",
            padding: "0px 20px",
            fontSize: "16px",
            borderRadius: "16px",
          },
          },
        },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "large",
        },
        styleOverrides: {
          fontSizeMedium: {
            fontSize: "18px",
          },
          fontSizeSmall: {
            fontSize: "20px",
          },
          fontSizeLarge: {
            fontSize: "22px",
          },
        },
      },
      },
    });

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

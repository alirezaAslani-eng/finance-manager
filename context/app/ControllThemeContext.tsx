import { theme, getThemeWithMode, ThemeMode } from "@/lib/integration/mui";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { PropsWithChildren, useCallback, useState, createContext } from "react";
import { ControllThemeProvidedValue } from "./types";

const ControllThemeContext = createContext({} as ControllThemeProvidedValue);

function MuiThemeProvider({ children }: PropsWithChildren) {
  // * == > theme mode state
  const [mode, setMode] = useState<ThemeMode>("light");

  // * == > controll theme
  const changeMode = useCallback(() => {
    setMode((prev) => {
      if (prev == "dark") return "light";
      else if ((prev = "light")) return "dark";
      return "light";
    });
  }, [setMode]);

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
      <ThemeProvider theme={createTheme(getThemeWithMode(theme, { mode }))}>
        {children}
      </ThemeProvider>
    </ControllThemeContext>
  );
}

export { MuiThemeProvider, ControllThemeContext };

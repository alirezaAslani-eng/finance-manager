import { createTheme, ThemeProvider } from "@mui/material";
import {
  PropsWithChildren,
  useCallback,
  useState,
  createContext,
  useMemo,
  useEffect,
} from "react";



type themeModeType = "dark" | "light";
interface ControllThemeProvider_face {
  changeMode: (mode: themeModeType) => void;
}

const ControllThemeContext = createContext({} as ControllThemeProvider_face);



function MuiThemeProvider({ children }: PropsWithChildren) {


  // * Mui Base Theme Configuration =============================== >


  // * == > theme mode state
  const [mode, setMode] = useState<themeModeType>("light");
  useEffect(() => {
    setMode((localStorage.getItem("theme") as "dark") || "light");
  }, []);




  // * == > controll theme
  const changeMode = useCallback((mode: themeModeType) => {
    localStorage.setItem("theme", mode);
    setMode(mode);
  }, []);




  // * == > MuiTheme
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
      typography: {
        fontFamily: "var(--dana-md), Vazir, sans-serif",
      },
    });
  }, [mode]);


  

  return (
    <ControllThemeContext value={{ changeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ControllThemeContext>
  );
}

export { MuiThemeProvider, ControllThemeContext };

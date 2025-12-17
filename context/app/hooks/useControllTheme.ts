import React, { useContext } from "react";
import { UseControllThemeContext } from "./types";
import { ControllThemeContext } from "../ControllThemeContext";

const useControllTheme: UseControllThemeContext = () => {
  const providedValue = useContext(ControllThemeContext);
  return providedValue;
};

export default useControllTheme;

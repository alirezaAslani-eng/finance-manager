import React, { useContext } from "react";
import MuiButton from "./MuiButton";
import { useTheme } from "@mui/material/styles";
import { ControllThemeContext } from "@/context/ControllThemeContext";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import type { ButtonProps } from "@mui/material";

interface myProps {
  buttonProps?: ButtonProps;
}
function ThemeButton({ buttonProps }: myProps = {}) {
  const {
    palette: { mode },
  } = useTheme();
  const { changeMode } = useContext(ControllThemeContext);
  return (
    <MuiButton
      buttonProps={{
        onClick: changeMode,
        ...buttonProps,
        sx: {
          padding: "10px",
          minHeight: "0",
          minWidth: "0",
          borderRadius: "999px",
          ...buttonProps?.sx,
        },
      }}
    >
      {mode == "light" ? <BedtimeRoundedIcon /> : <WbSunnyRoundedIcon />}
    </MuiButton>
  );
}

export default ThemeButton;

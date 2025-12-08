import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ControllThemeContext } from "@/context/ControllThemeContext";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { Button } from "@mui/material";

function ThemeButton() {
  const {
    palette: { mode },
  } = useTheme();
  // * use context to change theme mode ======= >
  const { changeMode } = useContext(ControllThemeContext);

  return (
    <Button
      onClick={changeMode}
      size="medium"
      variant="text-grey"
      sx={(theme) => {
        return {
          ...(theme.custom.circleButton as object),
        };
      }}
    >
      {mode == "light" ? <BedtimeRoundedIcon /> : <WbSunnyRoundedIcon />}
    </Button>
  );
}

export default ThemeButton;

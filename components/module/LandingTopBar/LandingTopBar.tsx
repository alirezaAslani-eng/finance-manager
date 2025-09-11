import { MuiButton } from "@/components/ui";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
// * Icon ================ >
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { ControllThemeContext } from "@/context/ControllThemeContext";
import Link from "next/link";

function LandingTopBar() {
  const { changeMode, mode } = useContext(ControllThemeContext)
  return (
    <Box
      component={"header"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 20px",
      }}
    >
      {/* SignUp Button */}
      <Link href={"/auth/signin"}>
        <MuiButton buttonProps={{sx:{fontSize:{sm:"20px"},borderRadius:"999px"}}}>{"ورود | ثبت نام"}</MuiButton>
      </Link>
      {/* Logo ============================= > */}
      <Typography variant="h1" component={"h1"} sx={{ fontSize: "28px" }}>
        {"هزینه یار"}
      </Typography>
      {/* Theme Button =========================== > */}
      <MuiButton
        buttonProps={{
          onClick: changeMode,
          sx: {
            padding: "10px",
            minHeight: "0",
            minWidth: "0",
            borderRadius: "999px",
          },
        }}
      >
        {mode == "light" ? <BedtimeRoundedIcon /> : <WbSunnyRoundedIcon />}
      </MuiButton>
    </Box>
  );
}

export default LandingTopBar;

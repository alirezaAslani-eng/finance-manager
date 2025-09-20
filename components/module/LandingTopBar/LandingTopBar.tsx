import { Brand, MuiButton, ThemeButton } from "@/components/ui";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
// * Icon ================ >
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { ControllThemeContext } from "@/context/ControllThemeContext";
import Link from "next/link";
import { AuthContex } from "@/context";

function LandingTopBar() {
  const { changeMode, mode } = useContext(ControllThemeContext);

  // * AuthContext to handle ui states ================== >
  const { isLogin, userInfo } = useContext(AuthContex)!;
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
      <Link href={isLogin ? "/my-panel" : "/auth/signin"}>
        <MuiButton
          buttonProps={{
            sx: { fontSize: { sm: "20px" } },
          }}
        >
          {isLogin ? `${userInfo.fullName}` : "ورود | ثبت نام"}
        </MuiButton>
      </Link>
      {/* Logo ============================= > */}
      <Brand />
      {/* Theme Button =========================== > */}
      <ThemeButton />
    </Box>
  );
}

export default LandingTopBar;

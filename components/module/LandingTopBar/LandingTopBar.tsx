import { Brand, ThemeButton } from "@/components/ui";
import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
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
        <Button size="medium" variant="text-grey">
          {isLogin ? `${userInfo.fullName}` : "ورود | ثبت نام"}
        </Button>
      </Link>
      {/* Logo ============================= > */}
      <Brand />
      {/* Theme Button =========================== > */}
      <ThemeButton />
    </Box>
  );
}

export default LandingTopBar;

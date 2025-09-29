import { Brand, MuiButton, ThemeButton } from "@/components/ui";
import { muiTheme } from "@/utils";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface MyProps {
  onMenuClick?: (...arg: any) => any;
}
function MobileAppBar({ onMenuClick = () => {} }: MyProps) {
  // * Theme ====================== >
  const theme = useTheme();
  const { palette, alpha } = theme;
  // * Button Style ================== >
  const button_sx: SxProps = {
    ...theme.custom.resetButton,
    borderRadius: "999px",
    p: "10px",
    backgroundColor: "transparent",
    color: muiTheme(palette.mode, {
      light: palette.grey[700],
      dark: palette.primary.main,
    }),
  };
  // * Events ================ >
  const menuIconClick = () => {
    onMenuClick && onMenuClick();
  };

  // * JSX ================================================= >
  return (
    <Box
      component={"header"}
      sx={{
        width: "100%",
        padding: "10px",
        position: "sticky",
        top: "0px",
        zIndex: "10",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(30px)",
        backgroundColor: muiTheme(palette.mode, {
          light: alpha(palette.grey[50], 0.3),
          dark: alpha(palette.grey[900], 0.3),
        }),
      }}
    >
      {/* // * Menu Button ================= > */}
      <MuiButton
        buttonProps={{
          variant: "text",
          sx: { ...button_sx },
          onClick: menuIconClick,
        }}
      >
        <MenuRoundedIcon />
      </MuiButton>

      {/* // * Logo ======================= > */}
      <Brand />

      {/* // * Theme Button ================= > */}
      <ThemeButton buttonProps={{ variant: "text", sx: { ...button_sx } }} />
    </Box>
  );
}

export default MobileAppBar;

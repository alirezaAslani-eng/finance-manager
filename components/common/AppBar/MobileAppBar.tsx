import { Brand, ThemeButton } from "@/components/ui";
import { muiTheme } from "@/packages/mui";
import { Box, Button } from "@mui/material";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface MyProps {
  onMenuClick?: (...arg: any) => any;
}
function MobileAppBar({ onMenuClick = () => {} }: MyProps) {
  // * Events ================ >
  const menuIconClick = () => {
    onMenuClick && onMenuClick();
  };

  return (
    <Box
      component={"header"}
      sx={({ alpha, palette }) => {
        return {
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
        };
      }}
    >
      {/* // * Menu Button ================= > */}
      <Button
        variant="text-grey"
        size="medium"
        sx={(theme) => {
          return {
            ...(theme.custom!.circleButton as object),
          };
        }}
        onClick={menuIconClick}
      >
        <MenuRoundedIcon />
      </Button>

      {/* // * Logo ======================= > */}
      <Brand />

      {/* // * Theme Button ================= > */}
      <ThemeButton />
    </Box>
  );
}

export default MobileAppBar;

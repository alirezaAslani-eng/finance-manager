import { Brand, ThemeButton } from "@/components/ui";
import { muiTheme } from "@/packages/mui";
import { Box, Button, Typography } from "@mui/material";
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
      width="100%"
      padding="10px"
      position="sticky"
      top="0px"
      zIndex="10"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      component={"header"}
      bgcolor={"background.paper"}
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
      <Typography variant="xl-title" color="primary">
        {"هزینه یار"}
      </Typography>

      {/* // * Theme Button ================= > */}
      <ThemeButton />
    </Box>
  );
}

export default MobileAppBar;

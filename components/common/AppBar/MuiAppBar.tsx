import { ThemeButton } from "@/components/ui";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React from "react";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { muiTheme } from "@/packages/mui";
import Link from "next/link";

function TopBar() {
  return (
    <Box
      position="sticky"
      bgcolor={"background.paper"}
      width="100%"
      top="0"
      right="0"
      borderBottom="1px solid"
      sx={({ palette, alpha }) => {
        return {
          borderColor: muiTheme(palette.mode, {
            light: alpha(palette.black, 0.12),
            dark: alpha(palette.white, 0.12),
          }),
        };
      }}
    >
      <Toolbar>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          flexDirection={"row"}
          flex={"1"}
        >
          <Box display= "flex" alignItems= "center" gap= "10px">
            {/* User Info Link ==================== > */}
            <Link href={""}>
              <Button
                sx={({ custom }) => {
                  return custom!.circleButton as object;
                }}
                variant="text-grey"
                size="medium"
              >
                <AccountCircleRoundedIcon />
              </Button>
            </Link>

            {/* Theme Button ==================== > */}
            <ThemeButton />
          </Box>
          {/* Logout Button ===================== > */}
          <Button color="error" size="medium" sx={{ gap: "5px" }}>
            <Typography component={"span"}>{"خروج"}</Typography>
            <PowerSettingsNewRoundedIcon fontSize="medium" />
          </Button>
        </Stack>
      </Toolbar>
    </Box>
  );
}

export default TopBar;

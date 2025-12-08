import { ThemeButton } from "@/components/ui";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React from "react";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { muiTheme } from "@/utils";
import Link from "next/link";

function TopBar() {
  return (
    <AppBar
      position="sticky"
      sx={({ palette, alpha }) => {
        return {
          backgroundColor: muiTheme(palette.mode, {
            light: alpha(palette.grey[50], 0.5),
            dark: alpha(palette.grey[900], 0.5),
          }),
          backdropFilter: "blur(20px)",
          width: "100%",
          top: "0",
          right: "0",
        };
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* User Info Link ==================== > */}
            <Link href={""}>
              <Button
                sx={({ custom }) => {
                  return { ...custom.circleButton };
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

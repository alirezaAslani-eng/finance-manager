import { Brand, MuiButton, ThemeButton } from "@/components/ui";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import React from "react";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { muiTheme } from "@/utils";
import Link from "next/link";
const drawerWidth = 240;
function TopBar() {
  const theme = useTheme();
  const { palette } = theme;
  // * Custom Theme ============ >

  const button_sx = {
    backgroundColor: muiTheme(palette.mode, {
      dark: palette.primary.main,
      light: "transparent",
    }),
    color: muiTheme(palette.mode, {
      dark: "",
      light: palette.grey[50],
    }),
    padding: "8px",
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        top: "0",
        right: "0",
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
              <MuiButton
                buttonProps={{
                  sx: {
                    ...theme.custom.resetButton,
                    ...button_sx,
                    borderRadius: "999px",
                  },
                }}
              >
                <AccountCircleRoundedIcon />
              </MuiButton>
            </Link>

            {/* Theme Button ==================== > */}
            <ThemeButton
              buttonProps={{
                sx: button_sx,
              }}
            />
          </Box>
          {/* Logout Button ===================== > */}
          <MuiButton
            buttonProps={{
              color: "error",
              sx: {
                ...theme.custom.resetButton,
                p: "8px",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              },
            }}
          >
            {"خروج"}
            <PowerSettingsNewRoundedIcon />
          </MuiButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

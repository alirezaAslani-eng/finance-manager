import { Brand, MuiButton } from "@/components/ui";
import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import type { DrawerProps } from "@mui/material";
import React from "react";
import { dana_md, peyda_md } from "@/utils/font";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useBreakePoints } from "@/hooks";
import SideBarItems from "./SideBarItems";
interface MyProps {
  drawerProps?: DrawerProps;
  onClose?: () => any;
  onLogout?: () => any;
}
function SideBar({ drawerProps, onClose, onLogout }: MyProps) {
  // * Breakepoints =================== >
  const { isTablet } = useBreakePoints();
  // * Events ======================= >
  const closeMe = () => {
    onClose && onClose();
  };
  const logout = () => {
    onLogout && onLogout();
  };
  // * JSX ==================================================== >
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      {...drawerProps}
      onClose={closeMe}
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
        },
        ...drawerProps?.sx,
      }}
    >
      <Toolbar>
        <Box
          className={peyda_md.className}
          sx={{ textAlign: "center", width: "100%" }}
        >
          <Brand textProps={{ color: "primary" }} />
        </Box>
      </Toolbar>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* // * MenuList ==================== > */}
        <List className={dana_md.className}>
          <SideBarItems onSideBarClick={closeMe} />
        </List>

        {/* // * Logout Button ====================== > */}
        {!isTablet && (
          <Box padding={"10px"} className={dana_md.className}>
            <MuiButton
              buttonProps={{
                onClick: logout,
                className: dana_md.className,
                color: "error",
                fullWidth: true,
                sx: {
                  display: "flex",
                  padding: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                },
              }}
            >
              {"خروج از پنل"}
              <PowerSettingsNewRoundedIcon />
            </MuiButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default SideBar;

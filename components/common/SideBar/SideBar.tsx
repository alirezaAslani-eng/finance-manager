import { Brand } from "@/components/ui";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import type { DrawerProps } from "@mui/material";
import React from "react";
import { dana_md, peyda_md } from "@/utils/font";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import SideBarItems from "./SideBarItems";
interface MyProps {
  drawerProps?: DrawerProps;
  onClose?: () => any;
  onLogout?: () => any;
}
function SideBar({ drawerProps, onClose, onLogout }: MyProps) {
  // * Breakepoints =================== >
  const isTablet = useMediaQuery((tm) => tm.breakpoints.up("md"));

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
      className={`${dana_md.variable} ${peyda_md.variable}`}
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
        <Box sx={{ textAlign: "center", width: "100%" }}>
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
        <List>
          <SideBarItems onSideBarClick={closeMe} />
        </List>
        {/* // * Logout Button ====================== > */}
        {!isTablet && (
          <Button
            onClick={logout}
            size="large"
            color="error"
            fullWidth
            sx={{ gap: "10px", borderRadius: "0px" }}
          >
            {"خروج از پنل"}
            <PowerSettingsNewRoundedIcon fontSize="large" />
          </Button>
        )}
      </Box>
    </Drawer>
  );
}

export default SideBar;

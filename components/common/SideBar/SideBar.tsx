import { Brand, SideBarButton } from "@/components/ui";
import { menuList } from "@/constant/staticData";
import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import React from "react";

function SideBar() {
  return (
    <Drawer
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar>
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Brand textProps={{ color: "primary" }} />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuList.map((info) => (
          <SideBarButton menuItem={{ ...info }} />
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;

import * as React from "react";
import Box from "@mui/material/Box";
import { MuiAppBar, SideBar } from "@/components/common";

// TODO => Style  SearchBox Style & Logic -- Drawer List

export default function PanelLayout({ children }: React.PropsWithChildren) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Side Bar =============================== > */}
      <SideBar />
      {/* Main Content =================================== > */}
      <Box sx={{ flex: "1", minWidth: "0" }}>
        {/* Top Bar ============================= > */}
        <MuiAppBar />
        <Box component={"main"} sx={{ minHeight: `calc(100svh - 64px)` }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

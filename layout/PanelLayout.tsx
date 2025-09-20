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
        {children}
      </Box>
    </Box>
  );
}

import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import {
  BottomNavigationPanel,
  PanelAppBar,
  SideBar,
} from "@/components/common";
import { useMediaQuery } from "@mui/material";
// TODO => Style  SearchBox Style & Logic -- Drawer List

export default function PanelLayout({ children }: PropsWithChildren) {
  // * Brakepoints ======================= >
  const isAfter_md = useMediaQuery((tm) => tm.breakpoints.up("md"));

  // * JSX ========================================== >
  return (
    <Box sx={{ display: "flex" }}>
      {/* // *Side Bar =============================== > */}
      {isAfter_md && <SideBar />}
      {/* // * Main Content =================================== > */}
      <Box sx={{ flex: "1", minWidth: "0" }}>
        {/* Top Bar ============================= > */}
        <PanelAppBar />
        <Box component={"main"} sx={{ minHeight: `calc(100svh - 64px)` }}>
          {children}
        </Box>
        {!isAfter_md && <BottomNavigationPanel />}
      </Box>
    </Box>
  );
}

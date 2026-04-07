import { PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import { PanelAppBar, SideBar } from "@/components/common";
import { useMediaQuery } from "@mui/material";
// TODO => Style  SearchBox Style & Logic -- Drawer List

export default function PanelLayout({ children }: PropsWithChildren) {
  // * SideBar State =========================== >
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] =
    useState<boolean>(false);
  // * Brakepoints ======================= >
  const isTablet = useMediaQuery((tm) => tm.breakpoints.up("md"));

  // * Events ===================== >
  const closeSidebarMobile = () => {
    setIsOpenMobileSidebar(false); // * Close SideBar <<<
  };
  const openSidebarMobile = () => {
    setIsOpenMobileSidebar(true); // * Open SideBar <<<
  };

  // * JSX ========================================== >
  return (
    <Box sx={{ display: "flex" }}>
      {/* // *Side Bar =============================== > */}
      <SideBar
        onClose={closeSidebarMobile}
        drawerProps={{
          variant: `${isTablet ? "permanent" : "temporary"}`,
          open: isOpenMobileSidebar,
        }}
      />
      {/* // * Main Content =================================== > */}
      <Box sx={{ flex: "1", minWidth: "0" }}>
        {/* Top Bar ============================= > */}
        <PanelAppBar />
        <Box component={"main"} sx={{ minHeight: `calc(100svh - 64px)` }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

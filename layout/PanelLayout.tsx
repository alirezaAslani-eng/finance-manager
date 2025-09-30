import { PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import { MobileAppBar, MuiAppBar, SideBar } from "@/components/common";
import { useBreakePoints } from "@/hooks";
// TODO => Style  SearchBox Style & Logic -- Drawer List

export default function PanelLayout({ children }: PropsWithChildren) {
  // * SideBar State =========================== >
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] =
    useState<boolean>(false);
  // * Brakepoints ======================= >
  const { isTablet } = useBreakePoints();

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
        {isTablet ? (
          <MuiAppBar />
        ) : (
          <MobileAppBar onMenuClick={openSidebarMobile} />
        )}
        <Box component={"main"} sx={{ minHeight: `calc(100svh - 64px)` }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

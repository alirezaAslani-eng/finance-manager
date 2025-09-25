import {
  HeadingFilter,
  SidebarFilter,
  Transactions,
} from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import React, { useState } from "react";

const index: PageComponent = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  //  * Events ====================>
  const openSidebar = () => {
    setIsOpenSidebar(true);
  };
  const closeSidebar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <Box padding={"30px"}>
      {/* Heading Filter  ========================= > */}
      <HeadingFilter onSidebar={openSidebar} />
      {/* Sidebar Advanced Filter ========================= > */}
      <SidebarFilter open={isOpenSidebar} onClose={closeSidebar} />
      {/* Transactions ===================== > */}
      <Box sx={{mt:"20px"}}>
        <Transactions />
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;
export default index;

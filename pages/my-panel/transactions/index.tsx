import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import React from "react";

const index: PageComponent = () => {
  return <Box padding={"30px"}>
    {/* Heading Filter  ========================= > */}
    {/* Sidebar Advanced Filter ========================= > */}
    {/* Transactions ===================== > */}
  </Box>
};

index.Layout = PanelLayout;
export default index;

import { TransactionForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import React from "react";

const add: PageComponent = () => {
  return (
    <Box padding={"30px"}>
      <TransactionForm />
    </Box>
  );
};
add.Layout = PanelLayout;
export default add;

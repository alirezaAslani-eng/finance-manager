import { AccountForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";
import React from "react";

const add: PageComponent = () => {
  return (
    <Container>
      <AccountForm />
    </Container>
  );
};

add.Layout = PanelLayout;
export default add;

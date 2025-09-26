import { TransactionForm } from "@/components/module";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";
import React from "react";

const add: PageComponent = () => {
  return (
    <Container>
      <TransactionForm />
    </Container>
  );
};
add.Layout = PanelLayout;
export default add;

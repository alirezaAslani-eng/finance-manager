import { TransactionForm } from "@/components/module";
import { useAddTransaction } from "@/hooks";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";
import React from "react";

const add: PageComponent = () => {
  const { addTransaction } = useAddTransaction();
  return (
    <Container>
      <TransactionForm onSubmit={addTransaction} />
    </Container>
  );
};
add.Layout = PanelLayout;
export default add;

import { TransactionForm } from "@/components/module";
import { TransactionDetailsModal } from "@/components/ui";
import { useAddTransaction } from "@/hooks";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container, Dialog } from "@mui/material";
import React from "react";

const add: PageComponent = () => {
  // * Add Transaction Hook ==== >
  const {
    addTransaction,
    closeModal,
    openModal,
    transaction,
    categoryName,
    isOpenModal,
    isPending,
  } = useAddTransaction();
  // * Submit Tranaction ==== >
  const SubmitTransaction = async () => {
    addTransaction(transaction!);
  };

  return (
    <>
      <Container>
        <TransactionForm onSubmit={openModal} />
      </Container>
      {/* // * Show Final Details And then Submit by Confriming modal */}
      <Dialog
        open={isOpenModal}
        onClose={closeModal}
        PaperProps={{ style: { width: "min(100%,500px)" } }}
      >
        <TransactionDetailsModal
          isSubmiting={isPending}
          onReject={closeModal}
          onAccept={SubmitTransaction}
          amount={transaction?.amount}
          category={categoryName}
          type={transaction?.type == "0" ? "expense" : "income"}
        />
      </Dialog>
    </>
  );
};
add.Layout = PanelLayout;
export default add;

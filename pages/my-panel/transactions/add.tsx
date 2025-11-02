import { TransactionForm } from "@/components/module";
import { TransactionDetailsModal, ModalHandler } from "@/components/ui";
import { useAddTransaction } from "@/hooks";
import { PanelLayout } from "@/layout";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";
import React, { useContext, useState } from "react";

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
      <ModalHandler isOpen={isOpenModal} onClose={closeModal}>
        <TransactionDetailsModal
          isSubmiting={isPending}
          onReject={closeModal}
          onAccept={SubmitTransaction}
          amount={transaction?.amount}
          category={categoryName}
          type={transaction?.type == "0" ? "expense" : "income"}
        />
      </ModalHandler>
    </>
  );
};
add.Layout = PanelLayout;
export default add;

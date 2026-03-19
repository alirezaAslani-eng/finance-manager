import { CreateTransactionForm } from "@/components/module";
import { FormPanelHeading, TransactionDetailsModal } from "@/components/ui";
import { useAddTransaction } from "@/hooks";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container, Dialog } from "@mui/material";

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
      <Container maxWidth="sm" sx={{ maxWidth: undefined }}>
        <FormPanelHeading>
          <FormPanelHeading.Title>{"تراکنش جدید"}</FormPanelHeading.Title>
          <FormPanelHeading.BackButton />
        </FormPanelHeading>

        <CreateTransactionForm>
          <CreateTransactionForm.FormContainer />
          <CreateTransactionForm.SubmitButton>
            {"ایجاد تراکنش"}
          </CreateTransactionForm.SubmitButton>
        </CreateTransactionForm>
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

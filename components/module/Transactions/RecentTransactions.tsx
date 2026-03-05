import { TransactionCard } from "@/components/ui";
import { useModalState } from "@/hooks";
import DialogBottomSheet from "@/packages/mui/styled-components/Dialog/DialogBottomSheet";
import { Transaction, TransactionList } from "@/types/transaction.types";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import TransactionInfo from "./TransactionInfo";
const fake_transactions: TransactionList = [
  {
    _id: "123",
    account: "",
    amount: 2400000,
    category: { _id: "", name: "دسته بندی" },
    createdAt: new Date().toISOString(),
    isLatest: true,
    reason: "",
    type: "0",
    user: "",
  },
];
const RecentTransactions = (boxProps: BoxProps) => {
  const { isOpenModal, modalInfo, closeModal, openModal } =
    useModalState<Transaction>({
      isParentModal: true,
    });

  return (
    <Box {...boxProps}>
      {fake_transactions.map((transaction) => {
        return (
          <Box
            width={"100%"}
            alignSelf={"start"}
            onClick={() => openModal(transaction)}
          >
            <TransactionCard {...transaction} />
          </Box>
        );
      })}
      <DialogBottomSheet open={!!modalInfo && isOpenModal} onClose={closeModal}>
        {!!modalInfo && <TransactionInfo {...modalInfo} />}
      </DialogBottomSheet>
    </Box>
  );
};

export default RecentTransactions;

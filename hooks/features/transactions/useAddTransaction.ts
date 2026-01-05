import { createTransaction } from "@/api";
import { useAuth } from "@/context";
import { keyRecentTransactions, keyUserInfo } from "@/packages/react-query";
import { CreateTransactionSchemaType } from "@/lib/validations/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BadResponse_face } from "@/types/error.types";

function useAddTransaction() {
  // * State for when wee need to cache the transaction info and submit it from state ===== >
  const [transaction, setTransaction] =
    useState<CreateTransactionSchemaType | null>(null);

  // * State of transaction modal to show final information ==== >
  const [isOpenModal, setIsOpenModal] = useState(false);

  // * in the state below category prop is an _id  ==== >
  const [categoryName, setCategoryName] = useState("");

  // * Auth Context to access to user's categories ====== >
  const { userInfo } = useAuth();

  // * Open Transaction Modal === >
  const openModal = (transaction: CreateTransactionSchemaType) => {
    setTransaction(transaction); // * set transaction before submit to show it on modal <<<
    setCategoryName(
      userInfo.categories.find((iteem) => iteem._id == transaction.category)
        ?.name || ""
    );
    setIsOpenModal(true);
  };

  // * Close Transaction Modal === >
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTransaction,
  });

  const addTransaction = async (
    transactionInfo: CreateTransactionSchemaType
  ) => {
    try {
      await mutateAsync(transactionInfo);
      // * invalid recent transactions after add one ========== >
      await queryClient.invalidateQueries({
        queryKey: keyRecentTransactions.all,
      });
      // * invalid user info to update current balance ========== >
      await queryClient.invalidateQueries({
        queryKey: keyUserInfo.all,
      });
      // * Close Modal and clean state === >
      closeModal();
      // TODO Show Success Message ================== >
    } catch (err) {
      const error = err as BadResponse_face;
      // TODO Show Error Message ================== >
    }
  };

  return {
    addTransaction,
    openModal,
    closeModal,
    transaction,
    isOpenModal,
    categoryName,
    isPending,
  };
}

export default useAddTransaction;

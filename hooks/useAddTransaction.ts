import { postOneTransactions } from "@/api/post";
import { keys } from "@/config/react-query";
import { AuthContex } from "@/context";
import { BadResponse } from "@/lib/utils";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

function useAddTransaction() {
  // * State for when wee need to cache the transaction info and submit it from state ===== >
  const [transaction, setTransaction] = useState<transactionSchemaType | null>(
    null
  );

  // * State of transaction modal to show final information ==== >
  const [isOpenModal, setIsOpenModal] = useState(false);

  // * in the state below category prop is an _id  ==== >
  const [categoryName, setCategoryName] = useState("");

  // * Auth Context to access to user's categories ====== >
  const { userInfo } = useContext(AuthContex)!;

  // * Open Transaction Modal === >
  const openModal = (transaction: transactionSchemaType) => {
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
    mutationFn: postOneTransactions,
  });

  const addTransaction = async (transactionInfo: transactionSchemaType) => {
    try {
      await mutateAsync(transactionInfo);
      // * invalid recent transactions after add one ========== >
      await queryClient.invalidateQueries({
        queryKey: keys.recntTransactions.all,
      });
      // * invalid user info to update current balance ========== >
      await queryClient.invalidateQueries({
        queryKey: keys.userInfo.all,
      });
      // * Close Modal and clean state === >
      closeModal();
      // TODO Show Success Message ================== >
    } catch (err) {
      const error = err as BadResponse;
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

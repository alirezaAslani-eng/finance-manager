import { postOneTransactions } from "@/api/post";
import { keys } from "@/config/react-query";
import { BadResponse } from "@/lib/utils";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddTransaction() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({ mutationFn: postOneTransactions });

  const addTransaction = async (transactionInfo: transactionSchemaType) => {
    try {
      await mutateAsync(transactionInfo);
      // * update recent transactions after add one ========== >
      await queryClient.invalidateQueries({
        queryKey: keys.recntTransactions.all,
      });
      // TODO Show Success Message ================== >
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error Message ================== >
    }
  };

  return { addTransaction };
}

export default useAddTransaction;

import { deleteOneTransaction } from "@/api/delete";
import { keys } from "@/config/react-query";
import type { BadResponse } from "@/lib/utils";
import { RecentTransactionType } from "@/types/transaction.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRemoveTransaction() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteOneTransaction,
  });

  const removeTransaction = async (_id: string) => {
    // * delete one transaction from cache before request to server =============== >
    // * Delete Recent === >
    queryClient.setQueryData(
      keys.recntTransactions.all,
      (transactions: RecentTransactionType[]) => {
        console.log(transactions);
        // * REMOVE FROM CACHE
        if (!transactions?.length) return transactions;
        return transactions.filter((transaction) => {
          return transaction._id != _id;
        });
      }
    );
    // TODO remove it from all transaction cache <<<
    try {
      await mutateAsync(_id);
      // * refetch user's info to update accounts ============= >
      await queryClient.invalidateQueries({ queryKey: keys.userInfo.all });
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error <<<
      console.log(error);
    }
  };

  return { removeTransaction };
}

export default useRemoveTransaction;

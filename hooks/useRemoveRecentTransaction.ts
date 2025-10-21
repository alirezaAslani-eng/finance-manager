import { deleteOneTransaction } from "@/api/delete";
import { keys } from "@/config/react-query";
import type { BadResponse } from "@/lib/utils";
import { RecentTransactionType } from "@/types/transaction.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRemoveRecentTransaction() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteOneTransaction,
  });

  const removeTransaction = async (_id: string) => {
    try {
      await mutateAsync(_id); // * Delete it

      // * refetch recent transaction to update accounts ============= >
      await queryClient.refetchQueries({
        queryKey: keys.recntTransactions.all,
      });
      // * refetch user's info to update accounts ============= >
      await queryClient.refetchQueries({ queryKey: keys.userInfo.all });
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error <<<
      console.log(error);
    }
  };

  return { removeTransaction, isPending };
}

export default useRemoveRecentTransaction;

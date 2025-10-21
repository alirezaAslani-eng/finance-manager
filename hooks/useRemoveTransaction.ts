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
    try {
      await mutateAsync(_id); // * Delete it

      // * refetch user's info to update accounts ============= >
      await queryClient.invalidateQueries({ queryKey: keys.userInfo.all });
      // * refetch recent transaction to update accounts ============= >
      await queryClient.invalidateQueries({
        queryKey: keys.recntTransactions.all,
      });
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error <<<
      console.log(error);
    }
  };

  return { removeTransaction };
}

export default useRemoveTransaction;

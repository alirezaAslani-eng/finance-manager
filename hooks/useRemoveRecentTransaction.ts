import { deleteOneTransaction } from "@/api/delete";
import {
  keyRecentTransactions,
  keyUserInfo,
} from "@/packages/react-query/keys";
import type { BadResponse } from "@/lib/utils";
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
        queryKey: keyRecentTransactions.all,
      });
      // * refetch user's info to update accounts ============= >
      await queryClient.refetchQueries({ queryKey: keyUserInfo.all });
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error <<<
      console.log(error);
    }
  };

  return { removeTransaction, isPending };
}

export default useRemoveRecentTransaction;

import { putActiveAccount } from "@/api/put";
import { useAuth } from "@/context";
import { keyRecentTransactions } from "@/packages/react-query/keys";
import { BadResponse } from "@/lib/utils";
import { ActiveAccountSchemaType } from "@/lib/validations/accountSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function useActiveAccount() {
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: putActiveAccount,
  });
  const queryClient = useQueryClient();

  const { refetchMe } = useAuth();
  const activeAccount = async (infoToActive: ActiveAccountSchemaType) => {
    try {
      setIsPending(true);
      await mutateAsync(infoToActive);
      // * Refetch Recent transactions ============== >
      await queryClient.invalidateQueries({
        queryKey: keyRecentTransactions.all,
      });
      // * Refetch user's info to update accounts so that user can see actived account ============== >
      await refetchMe();
    } catch (err) {
      const error = err as BadResponse;
      // Todo Show Error if user cant active an account ========= >
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return { isPending, activeAccount };
}

export default useActiveAccount;

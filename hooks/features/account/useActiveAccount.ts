import { switchAccount } from "@/api";
import { useAuth } from "@/context";
import { keyRecentTransactions } from "@/packages/react-query";
import { ActiveAccountSchemaType } from "@/lib/validations/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BadResponse_face } from "@/types/error.types";

function useActiveAccount() {
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: switchAccount,
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
      const error = err as BadResponse_face;
      // Todo Show Error if user cant active an account ========= >
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return { isPending, activeAccount };
}

export default useActiveAccount;

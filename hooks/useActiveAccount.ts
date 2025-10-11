import { putActiveAccount } from "@/api/put";
import { keys, queryClient } from "@/config/react-query";
import { AuthContex } from "@/context";
import { BadResponse } from "@/lib/utils";
import { ActiveAccountSchemaType } from "@/lib/validations/accountSchema";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";

function useActiveAccount() {
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: putActiveAccount,
  });

  const { refetchMe } = useContext(AuthContex)!;
  const activeAccount = async (infoToActive: ActiveAccountSchemaType) => {
    try {
      setIsPending(true);
      await mutateAsync(infoToActive);
      // * Refetch Recent transactions ============== >
      await queryClient.invalidateQueries({
        queryKey: keys.recntTransactions.all,
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

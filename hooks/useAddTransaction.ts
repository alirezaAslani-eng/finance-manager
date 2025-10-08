import { postOneTransactions } from "@/api/post";
import { BadResponse } from "@/lib/utils";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";
import { useMutation } from "@tanstack/react-query";

function useAddTransaction() {
  const { mutateAsync } = useMutation({ mutationFn: postOneTransactions });

  const addTransaction = async (transactionInfo: transactionSchemaType) => {
    try {
      await mutateAsync(transactionInfo);
      // TODO Show Success Message ================== >
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error Message ================== >
    }
  };

  return { addTransaction };
}

export default useAddTransaction;

import { putEditTransaction } from "@/api/put";
import { BadResponse } from "@/lib/utils";
import { transactionEditSchemaType } from "@/lib/validations/transactionSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useEditTransaction(_id: string) {
  const { mutateAsync } = useMutation({ mutationFn: putEditTransaction });
  const { push } = useRouter();
  const editTransaction = async (info: transactionEditSchemaType) => {
    try {
      await mutateAsync({ _id, ...info });
      push(`/my-panel/transactions/${_id}`);
    } catch (err) {
      const error = err as BadResponse;
      console.log(error);
      // todo show erro to user ======= >>
    }
  };

  return { editTransaction };
}

export default useEditTransaction;

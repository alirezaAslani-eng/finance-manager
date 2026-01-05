import { editTransaction as _editTransaction } from "@/api";
import { EditTransactionSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useEditTransaction(_id: string) {
  const { mutateAsync } = useMutation({ mutationFn: _editTransaction });
  const { push } = useRouter();
  const editTransaction = async (info: EditTransactionSchemaType) => {
    try {
      await mutateAsync({ _id, ...info });
      push(`/my-panel/transactions/${_id}`);
    } catch (err) {
      const error = err as BadResponse_face;
      console.log(error);
      // todo show erro to user ======= >>
    }
  };

  return { editTransaction };
}

export default useEditTransaction;

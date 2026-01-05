import { editAccount as _editAccount } from "@/api";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";

function useEditccount(_id: string) {
  const { mutateAsync } = useMutation({ mutationFn: _editAccount });

  const editAccount = async (updatedInfo: CreateAccountSchemaType) => {
    try {
      await mutateAsync({ ...updatedInfo, _id });
      // todo show success message =============== >
    } catch (err) {
      const error = err as BadResponse_face;
      // todo show Error =============
      console.log(error);
    }
  };

  return { editAccount };
}

export default useEditccount;

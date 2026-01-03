import { postOneAccount } from "@/api/post";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";

function useAddccount() {
  const { mutateAsync } = useMutation({ mutationFn: postOneAccount });

  const addAccount = async (accountInfo: CreateAccountSchemaType) => {
    try {
      await mutateAsync(accountInfo);
      // todo show success message =============== >
    } catch (err) {
      const error = err as BadResponse_face;
      // todo show Error =============
      console.log(error);
    }
  };

  return { addAccount };
}

export default useAddccount;

import { putOneAccount } from "@/api/put";
import { AccountSchemaType } from "@/lib/validations/accountSchema";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";

function useEditccount(_id: string) {
  const { mutateAsync } = useMutation({ mutationFn: putOneAccount });

  const editAccount = async (updatedInfo: AccountSchemaType) => {
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

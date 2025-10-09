import { putOneAccount } from "@/api/put";
import { BadResponse } from "@/lib/utils";
import { AccountSchemaType } from "@/lib/validations/accountSchema";
import { useMutation } from "@tanstack/react-query";

function useEditccount(_id: string) {
  const { mutateAsync } = useMutation({ mutationFn: putOneAccount });

  const editAccount = async (updatedInfo: AccountSchemaType) => {
    try {
      await mutateAsync({ ...updatedInfo, _id });
      // todo show success message =============== >
    } catch (err) {
      const error = err as BadResponse;
      // todo show Error =============
      console.log(error);
    }
  };

  return { editAccount };
}

export default useEditccount;

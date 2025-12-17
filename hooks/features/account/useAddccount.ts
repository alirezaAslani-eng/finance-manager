import { postOneAccount } from "@/api/post";
import { BadResponse } from "@/lib/utils";
import { AccountSchemaType } from "@/lib/validations/accountSchema";
import { useMutation } from "@tanstack/react-query";

function useAddccount() {
  const { mutateAsync } = useMutation({ mutationFn: postOneAccount });

  const addAccount = async (accountInfo: AccountSchemaType) => {
    try {
      await mutateAsync(accountInfo);
      // todo show success message =============== >
    } catch (err) {
      const error = err as BadResponse;
      // todo show Error =============
      console.log(error);
    }
  };

  return { addAccount };
}

export default useAddccount;

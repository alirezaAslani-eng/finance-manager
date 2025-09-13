import { checkUserPhone } from "@/api/post";
import type { BadResponse } from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { Infer } from "zod";

function useCheckUserPhone() {
  // * react query mutation ================ >
  const { mutateAsync } = useMutation({ mutationFn: checkUserPhone });

  
  const isValidPhone = async (phone:string) => {
    try {
      // * Check user phone ============= >
      await mutateAsync(phone);
      return true;
    } catch (err) {
      const error = err as BadResponse;
      console.log(err);
      // TODO -> show Error message
    }
  };

  return isValidPhone;
}

export default useCheckUserPhone;

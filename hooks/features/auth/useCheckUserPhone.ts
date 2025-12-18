import { checkUserPhone } from "@/api/post";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";

function useCheckUserPhone() {
  // * react query mutation ================ >
  const { mutateAsync } = useMutation({ mutationFn: checkUserPhone });

  const isValidPhone = async (phone: string) => {
    try {
      // * Check user phone ============= >
      await mutateAsync(phone);
      return true;
    } catch (err) {
      const error = err as BadResponse_face;
      console.log(err);
      // TODO -> show Error message
    }
  };

  return isValidPhone;
}

export default useCheckUserPhone;

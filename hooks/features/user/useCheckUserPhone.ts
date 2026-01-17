import { checkUserPhone } from "@/api";
import { useAuth } from "@/context";
import { BadResponse_face } from "@/types/error.types";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useCheckUserPhone(
  options?: MutateOptions<true, BadResponse_face, { phone: string }, unknown>
) {
  const { mutateAsync, isPending, isSuccess} = useMutation<
    true,
    BadResponse_face,
    { phone: string }
  >({
    mutationFn: checkUserPhone,
  });
  const { setInfo } = useAuth();
  const { push } = useRouter();
  const checkPhone = async ({ phone }: { phone: string }): Promise<void> => {
    try {
      // * Check user phone ============= >
      await mutateAsync({ phone }, options);
      setInfo({ phone });
      if (options?.onSuccess) return;
      push("/auth/signin");
      // TODO -> show Success message
    } catch (err) {
      const error = err as BadResponse_face;
      if (options?.onError) return;
      // TODO -> show Error message
    }
  };

  return { checkPhone, isPending, isSuccess };
}

export default useCheckUserPhone;

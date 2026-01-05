import { signinUser } from "@/api";

import { useAuth } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useLogin() {
  const { replace } = useRouter();

  // AuthContext to refetch user ================ >
  const { refetchMe } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: signinUser,
  });

  const login = async ({
    otpCode,
    phone,
  }: {
    otpCode: string;
    phone: string;
  }) => {
    try {
      await mutateAsync({ phone, otpCode });
      await refetchMe();
      // * navigate user after successfull signin ============= >
      replace("/my-panel");
    } catch (err) {
      console.log(err);
      //  Todo show Error =========== <
    }
  };
  return { login };
}

export default useLogin;

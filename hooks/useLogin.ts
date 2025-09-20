import { loginUser } from "@/api/get";

import { AuthContex } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

function useLogin() {
  const { replace } = useRouter();

  // AuthContext to refetch user ================ >
  const { refetchMe } = useContext(AuthContex)!;

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
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

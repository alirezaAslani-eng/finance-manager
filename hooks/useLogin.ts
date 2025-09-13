import { loginUser } from "@/api/get";
import { AuthContex } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function useLogin() {
  const { replace } = useRouter();

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
      // * navigate user after successfull signin ============= >
      replace("/");
    } catch (err) {
      console.log(err);
      //  Todo show Error =========== <
    }
  };
  return { login };
}

export default useLogin;

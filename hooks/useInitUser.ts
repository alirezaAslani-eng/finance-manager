import { postInitInfo } from "@/api/post";
import { BadResponse } from "@/lib/utils";
import { InitSchemaType } from "@/lib/validations/initSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const useInitUser = () => {
  const { replace } = useRouter();
  const { mutateAsync } = useMutation({ mutationFn: postInitInfo });

  const initUser = async (initInfo: InitSchemaType) => {
    try {
      await mutateAsync(initInfo);
      replace("/my-panel")
    } catch (err) {
      const error = err as BadResponse;
      // TODO Show Error to User =============== >
      console.log(error);
    }
  };
  return { initUser };
};

export default useInitUser;

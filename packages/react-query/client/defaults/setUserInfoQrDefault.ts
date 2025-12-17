import type { QueryClient } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { getUserInfo } from "@/api/get";
import { keyUserInfo } from "../../keys";

const setUserInfoQrDefault = (client: QueryClient = queryClient): void => {
  client.setQueryDefaults(keyUserInfo.all, {
    queryFn: getUserInfo,
    retry: false,
  });
};

export default setUserInfoQrDefault

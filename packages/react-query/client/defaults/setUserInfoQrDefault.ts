import type { QueryClient } from "@tanstack/react-query";
import { getUserInfo } from "@/api";
import { queryClient, keyUserInfo } from "@/packages/react-query";

const setUserInfoQrDefault = (client: QueryClient = queryClient): void => {
  client.setQueryDefaults(keyUserInfo.all, {
    queryFn: getUserInfo,
    retry: false,
  });
};

export default setUserInfoQrDefault;

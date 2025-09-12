import { getUserInfo } from "@/api/get";
import { QueryClient } from "@tanstack/react-query";
import keys from "./keys";

const queryClient = new QueryClient();

queryClient.setQueryDefaults(keys.userInfo.all, {
  queryFn: getUserInfo,
  retry: false,
});

export default queryClient;

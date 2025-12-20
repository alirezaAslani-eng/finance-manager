import type { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/packages/react-query";
import { keyAllTransactions } from "@/packages/react-query";

const setAllTransactionsQrDefault = (
  client: QueryClient = queryClient
): void => {
  client.setQueryDefaults([keyAllTransactions.mainKey], {
    gcTime: 40000,
  });
};

export default setAllTransactionsQrDefault;

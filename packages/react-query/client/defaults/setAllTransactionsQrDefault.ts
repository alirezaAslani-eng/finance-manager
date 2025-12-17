import type { QueryClient } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { keyAllTransactions } from "../../keys";

const setAllTransactionsQrDefault = (
  client: QueryClient = queryClient
): void => {
  client.setQueryDefaults([keyAllTransactions.mainKey], {
    gcTime: 40000,
  });
};

export default setAllTransactionsQrDefault;

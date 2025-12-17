import { getRecentTransactions } from "@/api/get";
import { useQuery } from "@tanstack/react-query";
import { RecentTransactionType } from "@/types/transaction.types";
import { useEffect, useState } from "react";
import type {
  RecentTransactionsHookInput,
  ReturnTypePropTypes,
} from "./types/useRecentTransactions.types";
import { keyRecentTransactions } from "@/packages/react-query";

// * Hook ====================== >
function useRecentTransactions(
  { dontFetch, initialData }: RecentTransactionsHookInput = {
    dontFetch: false,
  }
): ReturnTypePropTypes {
  // * This state will be filled with an array of recent transactions from server or client
  const [transactions, setTransactions] = useState<RecentTransactionType[]>(
    initialData ?? []
  );

  // *  Request from client if there is no initial data ============ >
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !dontFetch, // * << turn off query
    queryKey: keyRecentTransactions.all,
    queryFn: getRecentTransactions,
    initialData: initialData ?? undefined,
  });

  // * Client Set data or update real-time ================== >
  useEffect(() => {
    if (dontFetch) return;
    if (isPending) return;
    if (isError) return;
    setTransactions(data as RecentTransactionType[]);
  }, [data, isError, isPending, initialData]);

  // * Return ====================== >
  return { transactions };
}

export default useRecentTransactions;

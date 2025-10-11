import { getRecentTransactions } from "@/api/get";
import { useQuery } from "@tanstack/react-query";
import { keys } from "@/config/react-query";
import { RecentTransactionType } from "@/types/transaction.types";
import { useEffect, useState } from "react";
import type {
  DataOutput,
  RecentTransactionsHookInput,
  ServiceOutput,
} from "./types/useRecentTransactions.types";

// * Hook Overloads ================== >
function useRecentTransactions(i?: {
  dontFetch?: false;
  initialData?: RecentTransactionType[];
}): DataOutput;

function useRecentTransactions(i?: {
  dontFetch?: true;
  initialData?: RecentTransactionType[];
}): ServiceOutput;

// * Hook ====================== >
function useRecentTransactions(
  { dontFetch, initialData }: RecentTransactionsHookInput = {
    dontFetch: false,
  }
) {
  // * This state will be filled with an array of recent transactions from server or client
  const [transactions, setTransactions] = useState<RecentTransactionType[]>(
    initialData ?? []
  );

  // *  Request from client if there is no initial data ============ >
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !dontFetch, // * << turn off query
    queryKey: keys.recntTransactions.all,
    queryFn: getRecentTransactions,
    initialData: initialData ?? undefined,
  });

  console.log(data);
  
  // * Client Set data or update real-time ================== >
  useEffect(() => {
    if (dontFetch) return;
    if (isPending) return;
    if (isError) return;
    setTransactions(data as RecentTransactionType[]);
  }, [data, isError, isPending, initialData]);

  // * Return ====================== >
  const dataAndService: DataOutput = { refetch, transactions } as const;
  const service: ServiceOutput = { refetch } as const;
  if (dontFetch) service;
  return dataAndService;
}

export default useRecentTransactions;

import type { BadResponse } from "@/lib/utils";
import type { RecentTransactionType } from "@/types/transaction.types";

const getRecentTransactions = async (): Promise<
  RecentTransactionType[] | BadResponse
> => {
  const res = await fetch("/api/transactions/recent");
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as RecentTransactionType[];
};

export default getRecentTransactions;

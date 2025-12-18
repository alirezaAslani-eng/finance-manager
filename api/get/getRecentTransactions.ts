import type { BadResponse_face } from "@/types/error.types";

import type { RecentTransactionType } from "@/types/transaction.types";

const getRecentTransactions = async (): Promise<
  RecentTransactionType[] | BadResponse_face
> => {
  const res = await fetch("/api/transactions/recent");
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes as RecentTransactionType[];
};

export default getRecentTransactions;

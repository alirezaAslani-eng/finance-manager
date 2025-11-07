import type { BadResponse } from "@/lib/utils";
import { AllTransactionResponse } from "@/pages/api/types/transactionApi.types";

const getMoreTransactions = async (
  nextCursor: string
): Promise<AllTransactionResponse> => {
  const res = await fetch(`/api/transactions/pagination/${nextCursor}`);
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  const pagedTransactions: AllTransactionResponse = jsonRes;
  return pagedTransactions;
};

export default getMoreTransactions;

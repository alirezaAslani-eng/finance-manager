import type { BadResponse } from "@/lib/utils";
import {
  AllTransactionResponse,
  TransactionFilterQueries,
} from "@/types/api/transactionApi.types";
import { transacctionQueryBuilder } from "@/utils";

const getMoreTransactions = async (
  nextCursor: string | null,
  queries: TransactionFilterQueries
): Promise<AllTransactionResponse> => {
  const parsedQueries = transacctionQueryBuilder(queries);
  const res = await fetch(
    `/api/transactions/${
      nextCursor ?? null
    }/pagination${parsedQueries}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  const pagedTransactions: AllTransactionResponse = jsonRes;
  return pagedTransactions;
};

export default getMoreTransactions;

import type { BadResponse } from "@/lib/utils";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { FilterSchemaType } from "@/lib/validations/transactionSchema";

const getMoreTransactions = async (
  nextCursor: string | null,
  queries: FilterSchemaType
): Promise<AllTransactionResponse> => {
  const res = await fetch(
    `/api/transactions/${nextCursor ?? null}/pagination`,
    {
      method: "POST",
      body: JSON.stringify(queries),
      headers: { "Content-Type": "application/json" },
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

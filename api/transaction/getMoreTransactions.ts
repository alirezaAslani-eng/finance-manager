import type { BadResponse_face } from "@/types/error.types";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { FilterTransactionSchemaType } from "@/lib/validations/types";

const getMoreTransactions = async (
  nextCursor: string | null,
  queries: FilterTransactionSchemaType
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
    throw jsonRes as BadResponse_face;
  }
  const pagedTransactions: AllTransactionResponse = jsonRes;
  return pagedTransactions;
};

export default getMoreTransactions;

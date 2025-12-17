import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import { KeyAllTransactions, TransactionsQueryKey } from "./types";

const keyAllTransactions: KeyAllTransactions = {
  mainKey: "transactions",
  all(filters) {
    return serializeDynamicKeys(filters);
  },
};

export default keyAllTransactions;

function serializeDynamicKeys(filters: FilterSchemaType): TransactionsQueryKey {
  return [
    "transactions",
    // * Filter Parmeters ==== >
    JSON.stringify(filters["type"]),
    JSON.stringify(filters["old"]),
    JSON.stringify(filters["minAmount"]),
    JSON.stringify(filters["maxAmount"]),
    JSON.stringify(filters["fromDate"]),
    JSON.stringify(filters["toDate"]),
    JSON.stringify(filters["categories"]),
    JSON.stringify(filters["accounts"]),
  ] as const;
}

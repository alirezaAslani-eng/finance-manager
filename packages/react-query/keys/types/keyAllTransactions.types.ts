import { FilterSchemaType } from "@/lib/validations/transactionSchema";

type TransactionsQueryKey = [
  "transactions",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

interface KeyAllTransactions {
  /**
   * First / Parent key
   */
  mainKey: TransactionsQueryKey["0"];
/**
 * this method returns an array which includes [mainKey,[...dynaimcKeys]]
 * And
 * [...dynaimcKeys] is a serilized array of FilterSchemaType
 */
  all: (dynamicKey: FilterSchemaType) => TransactionsQueryKey;
}

export type { TransactionsQueryKey , KeyAllTransactions };

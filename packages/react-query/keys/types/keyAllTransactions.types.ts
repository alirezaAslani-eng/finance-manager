import { FilterTransactionSchemaType } from "@/lib/validations/types";

type KeyAllTransactionsSerialized = [
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
  mainKey: KeyAllTransactionsSerialized["0"];
  /**
   * this method returns an array which includes [mainKey,[...dynaimcKeys]]
   * And
   * [...dynaimcKeys] is a serilized array of FilterTransactionSchemaType
   */
  all: (
    dynamicKey: FilterTransactionSchemaType
  ) => KeyAllTransactionsSerialized;
}

export type { KeyAllTransactionsSerialized, KeyAllTransactions };

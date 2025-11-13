import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}
interface FilteredTransactionResonse extends AllTransactionResponse {}

type URLFilterQueries =
  | "fromDate"
  | "toDate"
  | "minAmount"
  | "maxAmount"
  | "type"
  | "old"
  | "accounts"
  | "categories";
interface TrnasactionFilterURLQueries
  extends Partial<Record<URLFilterQueries, string | string[]>> {
  filter: string;
}

export type {
  AllTransactionResponse,
  FilteredTransactionResonse,
  TrnasactionFilterURLQueries,
};

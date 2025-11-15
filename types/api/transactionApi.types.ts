import { Transaction_face, TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}
interface FilteredTransactionResonse extends AllTransactionResponse {}

/**
 * More strict type for queries to filter transactions,
 *  it's needed to manage requests and client states
 */
interface TransactionFilterQueries {
  filter: boolean;
  fromDate?: Date;
  toDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  type?: Transaction_face["type"];
  old?: boolean;
  accounts?: string[];
  categories?: string[];
}

type URLFilterQueries = keyof TransactionFilterQueries;
interface TrnasactionFilterURLQueries
  extends Partial<Record<URLFilterQueries, string | string[]>> {}

export type {
  AllTransactionResponse,
  FilteredTransactionResonse,
  TrnasactionFilterURLQueries,
  TransactionFilterQueries,
};

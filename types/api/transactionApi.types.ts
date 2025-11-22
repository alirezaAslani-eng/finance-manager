import { Transaction_face, TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}

/**
 * More strict type for queries to filter transactions,
 *  it's needed to manage requests and client states
 */
interface TransactionFilterQueries {
  fromDate: Date | null;
  toDate: Date | null;
  minAmount: number | null;
  maxAmount: number | null;
  type: Transaction_face["type"] | null;
  old: boolean | null;
  accounts: string[];
  categories: string[];
}

type URLFilterQueries = keyof TransactionFilterQueries;
interface TrnasactionFilterURLQueries
  extends Partial<Record<URLFilterQueries, string | string[]>> {}

export type {
  AllTransactionResponse,
  TrnasactionFilterURLQueries,
  TransactionFilterQueries,
};

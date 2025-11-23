import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}

/**
 * More strict type for queries to filter transactions,
 *  it's needed to manage requests and client states
 */

type URLFilterQueries = keyof FilterSchemaType;
interface TrnasactionFilterURLQueries
  extends Record<URLFilterQueries, string | undefined> {}

export type { AllTransactionResponse, TrnasactionFilterURLQueries };

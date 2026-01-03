import { FilterTransactionSchemaType } from "@/lib/validations/types";
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

type URLFilterQueries = keyof FilterTransactionSchemaType;
interface TrnasactionFilterURLQueries
  extends Record<URLFilterQueries, string | undefined> {}
export type { AllTransactionResponse, TrnasactionFilterURLQueries };

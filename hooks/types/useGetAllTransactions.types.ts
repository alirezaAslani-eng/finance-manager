import {
  AllTransactionResponse,
  TransactionFilterQueries,
} from "@/types/api/transactionApi.types";
import { TransactionList } from "@/types/transaction.types";

// * Output Type ---- >
interface AllTransactionsOutputHook {
  // * Data ==== >
  transactions: TransactionList | undefined;
  // * States/Status ============== >
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  // * Functions ====== >
  loadMore: () => void;
}
// * Hook Type ---- >
type UseGetAllTransactions = (
  queries: TransactionFilterQueries
) => AllTransactionsOutputHook;

export type { UseGetAllTransactions, AllTransactionsOutputHook };

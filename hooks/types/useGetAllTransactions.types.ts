import { AllTransactionResponse } from "@/types/api/transactionApi.types";
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
type UseGetAllTransactions = () => AllTransactionsOutputHook;

export type { UseGetAllTransactions };

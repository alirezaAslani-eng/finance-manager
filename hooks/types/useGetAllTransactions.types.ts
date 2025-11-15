import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { TransactionList } from "@/types/transaction.types";

// * Hook Input ---- >
interface HookInput {
  // * Filter State ==== >
  isFilter: boolean;
}
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
type UseGetAllTransactions = (input: HookInput) => AllTransactionsOutputHook;

export type { UseGetAllTransactions, AllTransactionsOutputHook };

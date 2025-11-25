import { TransactionList } from "@/types/transaction.types";

// * Output Type ---- >
interface InfinitTransactionsOutputHook {
  /**
   * infinit transactions
   */
  transactions: TransactionList;
  /**
   * it's true when there is no more transactions
   */
  hasNextPage: boolean;
  /**
   * it's true when fetching next page
   */
  isFetchingNextPage: boolean;
  /**
   * can be true when requesting to filter transactions
   */
  isFiltering: boolean;
  /**
   * fetchNextPage
   */
  loadMore: () => void;
  /**
   * emprtArrayReason is an alert text for when user doesn't have any transactions
   * and the reason of it might because of result of filter
   */
  emprtArrayReason: string;
  /**
   * showing the message of error is handled inside this hook
   * but this is also a boolean state that let you have the state
   */
  isError: boolean;
}
// * Hook Type ---- >
type UseGetInfinitTransactions = () => InfinitTransactionsOutputHook;

export type { UseGetInfinitTransactions, InfinitTransactionsOutputHook };

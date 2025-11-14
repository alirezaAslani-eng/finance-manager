import { TransactionList } from "@/types/transaction.types";
import { AllTransactionsOutputHook } from "./useGetAllTransactions.types";
import { TransactionFilterQueries } from "@/types/api/transactionApi.types";

// * Input Type ------ >
interface HookInput {
  queriesToFilter: TransactionFilterQueries;
}
// * Output Type ---- >
type FilteredTransactionsOutputHook = {
  [key in keyof AllTransactionsOutputHook as `f_${key &
    string}`]: AllTransactionsOutputHook[key];
};
// * Hook Type ---- >
type UseGetFilteredTransactions = (
  input: HookInput
) => FilteredTransactionsOutputHook;

export type { UseGetFilteredTransactions };

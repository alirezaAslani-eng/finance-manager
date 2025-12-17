import { RecentTransactionType } from "@/types/transaction.types";

interface RecentTransactionsHookInput {
  initialData?: RecentTransactionType[];
  dontFetch?: boolean;
}
// * All return propertie Types >>>>
interface ReturnTypePropTypes {
  transactions: RecentTransactionType[];
}

export type { RecentTransactionsHookInput, ReturnTypePropTypes };

import { Refetch } from "@/config/react-query/query.types";
import { RecentTransactionType } from "@/types/transaction.types";

interface RecentTransactionsHookInput {
  initialData?: RecentTransactionType[];
  dontFetch?: boolean;
}
// * All return propertie Types >>>>
interface ReturnTypePropTypes {
  refetch: Refetch;
  transactions: RecentTransactionType[];
}
// * return states ============ >
interface DataOutput {
  refetch: ReturnTypePropTypes["refetch"];
  transactions: ReturnTypePropTypes["transactions"];
}
interface ServiceOutput {
  refetch: ReturnTypePropTypes["refetch"];
}

export type { RecentTransactionsHookInput, DataOutput, ServiceOutput };

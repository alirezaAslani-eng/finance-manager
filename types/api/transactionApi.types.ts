import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}
interface FilteredTransactionResonse extends AllTransactionResponse {}


export type { AllTransactionResponse, FilteredTransactionResonse };

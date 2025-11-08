import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}

export type { AllTransactionResponse };

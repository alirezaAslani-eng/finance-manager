import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string;
  hasMore: boolean;
}

export type { AllTransactionResponse };

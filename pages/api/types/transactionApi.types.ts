import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  lastId: string;
  hasMore: boolean;
}

export type { AllTransactionResponse };

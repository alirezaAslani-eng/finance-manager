import { TransactionList } from "@/types/transaction.types";

interface AllTransactionResponse {
  transactions: TransactionList;
  nextCursor: string | null;
  hasMore: boolean;
}
interface FilteredTransactionResonse extends AllTransactionResponse {}

interface TrnasactionFilterURLQueries {
  /**
   * Only Transactions before This Date
   */
  fromDate: Date;
  /**
   * Only Transactions after This Date
   */
  toDate: Date;
  /**
   * Only Transactions with amount greater than minAmount or equal
   */
  minAmount: number;
  /**
   * Only Transactions with amount less than maxAmount or equal
   */
  maxAmount: number;
  /**
   * 0 = Expense & 1 = Income
   */
  Type: 0 | 1;
  /**
   * true = Show Oldest Transactions & false = Default (Latest)
   */
  old: boolean;
}

export type {
  AllTransactionResponse,
  FilteredTransactionResonse,
  TrnasactionFilterURLQueries,
};

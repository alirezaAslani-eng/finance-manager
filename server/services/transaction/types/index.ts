import { FilterTransactionSchemaType } from "@/lib/validations/types";
import { account_schema, transaction_schema } from "@/server/models";
import {
  OneTransactionInfo,
  RecentTransactionType,
  TransactionList,
} from "@/types/transaction.types";
import { ClientSession, InferSchemaType } from "mongoose";

// * TransAction schema type
type TransactionModelSchema = InferSchemaType<typeof transaction_schema>;
type AccountModelSchema = InferSchemaType<typeof account_schema>;

// * createTransaction.ts
interface CreateTransaction_Info
  extends Omit<TransactionModelSchema, "accountBalance" | "isLatest"> {}
interface CreateTransaction_Output extends TransactionModelSchema {}
type CreateTransaction = (
  info: CreateTransaction_Info
) => Promise<CreateTransaction_Output>;

// * editOldTransaction.ts
type EditOldTransaction = (
  _id: string,
  info: Pick<TransactionModelSchema, "category" | "reason">
) => Promise<void>;

// * editLatestTransaction.ts
type EditLatestTransaction = (
  _id: string,
  info: Pick<TransactionModelSchema, "category" | "reason" | "amount" | "type">
) => Promise<void>;

// * isLatestTransaction.ts
type IsLatestTransaction = (
  _id: string,
  session?: ClientSession
) => Promise<boolean>;
// * initializeTransactions.ts
interface InitialTransations_OutPut {
  nextCursor: string | null;
  initial_transactions: TransactionList;
}
type InitializeTransactions = (
  userID: string,
  queries: FilterTransactionSchemaType
) => Promise<InitialTransations_OutPut>;
// * loadMoreTransactions.ts
interface LoadMoreTransactions_OutPut {
  more_transactions: TransactionList;
  nextCursor: string | null;
}
type LoadMoreTransactions = (
  lastID: string,
  userID: string,
  queries: FilterTransactionSchemaType
) => Promise<LoadMoreTransactions_OutPut>;

// * getOneTransaction.ts
type GetOneTransaction = (_id: string) => Promise<OneTransactionInfo | null>;

// * getRecentTransactions.ts
type GetRecentTransactions = (
  userID: string
) => Promise<RecentTransactionType[]>;
export type {
  // * createTransaction.ts
  CreateTransaction_Info,
  CreateTransaction,
  CreateTransaction_Output,
  AccountModelSchema,
  // * editOldTransaction.ts
  EditOldTransaction,
  // * editLatestTransaction.ts
  EditLatestTransaction,
  // * isLatestTransaction.ts
  IsLatestTransaction,
  // * initializeTransactions.ts
  InitializeTransactions,
  InitialTransations_OutPut,
  // * loadMoreTransactions.ts
  LoadMoreTransactions,
  LoadMoreTransactions_OutPut,
  // * getOneTransaction.ts
  GetOneTransaction,
  // * getRecentTransactions.ts
  GetRecentTransactions,
};

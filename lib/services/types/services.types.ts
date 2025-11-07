import { category_schema, transaction_schema } from "@/model";
import {
  MongoTransaction,
  Transaction_face,
  TransactionList,
} from "@/types/transaction.types";
import { InferSchemaType, Types } from "mongoose";

interface ServiceOptions {
  uniqCheck?: boolean;
}
interface GetOneTransactionServiceType {
  _id: string;
  type: Transaction_face["type"];
  amount: number;
  accountBalance: number;
  reason: string;
  user: string;
  isLatest: boolean;
  account: {
    _id: string;
    currentBalance: number;
    isActive: boolean;
    user: string;
    accountName: string;
    cardNumber: string;
  };
  category: {
    _id: string;
    name: string;
    user: string;
  };
  createdAt: string;
  updatedAt: string;
}

type CreateCategoryInputService = InferSchemaType<typeof category_schema>;
type CreatedCategoryReturnService = CreateCategoryInputService & {
  _id: string;
};

type InitialTransationsServiceOutPut = Promise<{
  nextCursor: string;
  initial_transactions: TransactionList;
}>;
type LoadMoreTransactionServiceOutPut = Promise<{
  more_transactions: TransactionList;
  nextCursor: string;
}>;
export type {
  ServiceOptions,
  GetOneTransactionServiceType,
  CreateCategoryInputService,
  CreatedCategoryReturnService,
  InitialTransationsServiceOutPut,
  LoadMoreTransactionServiceOutPut,
};

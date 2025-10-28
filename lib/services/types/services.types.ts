import { category_schema, transaction_schema } from "@/model";
import { Transaction_face } from "@/types/transaction.types";
import { InferSchemaType } from "mongoose";

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
type CreatedCategoryReturnService = CreateCategoryInputService & { _id: string };

export type {
  ServiceOptions,
  GetOneTransactionServiceType,
  CreateCategoryInputService,
  CreatedCategoryReturnService,
};

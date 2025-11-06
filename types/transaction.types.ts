import { Types } from "mongoose";
import { Account_face } from "./account.types";
import { Category_face } from "./category.types";
import { User_face } from "./user.types";
// * Basic Interface ===== >
interface Transaction_face {
  type: "0" | "1"; // * 1 = income & 0 = Expense
  amount: number;
  accountBalance: number;
  reason: string;
  user: User_face;
  account: Account_face;
  category: Category_face;
  isLatest: boolean;
}

// * Result of service or API Transaction type ======= >
type Transaction = Pick<
  Transaction_face,
  "amount" | "isLatest" | "reason" | "type"
> & {
  user: string;
  _id: string;
  createdAt: string;
  category: Pick<Transaction_face["category"], "name"> & { _id: string };
};
type RecentTransactionType = Transaction;

// * Array of transactions =============== >
type TransactionList = Transaction[];

// * Transaction Document ================= >
interface MongoTransaction
  extends Omit<Transaction, "user" | "_id" | "createdAt" | "category"> {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  category: {
    _id: Types.ObjectId;
    name: string;
  };
}

export type {
  Transaction_face,
  RecentTransactionType,
  Transaction,
  TransactionList,
  MongoTransaction,
};

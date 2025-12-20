import { CreateTransaction_Info } from "@/server/services";
import { Transaction_face } from "@/types/transaction.types";
import { ClientSession } from "mongoose";
// * applyTransactionEffectOnBalance.ts ==== >
type ApplyTransactionEffectOnBalance = (
  transactionInfo: CreateTransaction_Info,
  session?: ClientSession
) => Promise<number>;
// * removeTransactionEffectOnBalance.ts ==== >
type RemoveTransactionEffectOnBalance = (
  props: {
    accountId: string;
    amount: number;
    type: Transaction_face["type"];
  },
  session?: ClientSession
) => Promise<void>;

export type {
  ApplyTransactionEffectOnBalance,
  RemoveTransactionEffectOnBalance,
};

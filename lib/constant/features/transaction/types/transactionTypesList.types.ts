import { Transaction } from "@/types/transaction.types";

type TransactionTypeObject = {
  type: Transaction["type"];
  text: string;
};

export type { TransactionTypeObject };

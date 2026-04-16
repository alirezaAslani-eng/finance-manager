import { Transaction } from "@/types/transaction.types";

type TransactionTypeObject = {
  id: string;
  type: Transaction["type"];
  text: string;
};

export type { TransactionTypeObject };

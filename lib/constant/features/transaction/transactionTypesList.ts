import { TransactionTypeObject } from "./types";

const transactionTypesList: TransactionTypeObject[] = [
  { type: "1", text: "واریز", id: crypto.randomUUID() },
  { type: "0", text: "برداشت", id: crypto.randomUUID() },
];

export default transactionTypesList;

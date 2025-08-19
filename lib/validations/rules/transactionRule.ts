import { Transaction_face } from "@/types/transaction.types";
import { schema_model } from "@/types/utils";

const transactionRule: schema_model<Transaction_face> = {
  type: { type: String, required: true, match: /^[01]$/ },
  amount: { type: String, required: true, match: /^[0-9]+$/ },
  accountBalance: { type: String, required: true, match: /^[0-9]+$/ },
  reason: { type: String, maxlength: 500 },
  createdAt: { type: String, maxlength: 10, required: true },
};

export default transactionRule
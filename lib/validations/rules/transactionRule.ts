import { Transaction_face } from "@/types/transaction.types";
import { schema_model } from "@/types/utils";
import { user_model } from "@/model";
import mongoose from "mongoose";

const transactionRule: schema_model<Transaction_face> = {
  type: { type: String, required: true, match: /^[01]$/ },
  amount: { type: String, required: true, match: /^[0-9]+$/ },
  accountBalance: { type: String, required: true, match: /^[0-9]+$/ },
  reason: { type: String, maxlength: 500 },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
};

export default transactionRule;

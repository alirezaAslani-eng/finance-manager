import { Account_face } from "@/types/account.types";
import { schema_model } from "@/types/utils";
import { user_model } from "@/model";
import mongoose from "mongoose";

const accountRule: schema_model<Account_face> = {
  cardNumber: { type: String, required: true, match: /^[0-9]{16}$/ },
  // TODO -> currentBalance must be number
  currentBalance: { type: String, required: true, match: /^[0-9]+$/ },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
};

export default accountRule;

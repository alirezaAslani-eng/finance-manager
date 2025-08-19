import { Account_face } from "@/types/account.types";
import { schema_model } from "@/types/utils";

const accountRule: schema_model<Account_face> = {
  cardNumber: { type: String, required: true, match: /^[0-9]{16}$/ },
  currentBalance: { type: String, required: true, match: /^[0-9]+$/ },
  createdAt: { type: Date, maxlength: 10, required: true },
};

export default accountRule;

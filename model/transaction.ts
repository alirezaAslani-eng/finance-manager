import { Transaction_face } from "@/types/transaction.types";
import { account_model } from "./account"; // * Refrence
import m, {
  model,
  models,
  Schema,
  SchemaDefinitionProperty,
  Types,
} from "mongoose";

// override user,account because it's a refrence not a object with it's own keys
type overridedType = {
  user: SchemaDefinitionProperty<Types.ObjectId>;
  account: SchemaDefinitionProperty<Types.ObjectId>;
};
type schemaType = Omit<Transaction_face, "user" | "account"> & overridedType;
const transaction_schema = new Schema<schemaType>(
  {
    type: { type: String, required: true, match: /^[01]$/ },
    amount: { type: Number, required: true, min: 0 },
    accountBalance: { type: Number, required: true, min: 0 },
    reason: { type: String, maxlength: 500 },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    account: {
      type: Types.ObjectId,
      required: true,
      ref: "Account",
    },
  },
  { timestamps: true }
);

const transaction_model =
  models.Transaction || model<schemaType>("Transaction", transaction_schema);

export { transaction_model, transaction_schema };

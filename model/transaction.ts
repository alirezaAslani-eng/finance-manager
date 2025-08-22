import { Transaction_face } from "@/types/transaction.types";
import { account_model } from "@/model"; // * Relation
import { category_model } from "@/model"; // * Relation
import m, {
  model,
  models,
  Schema,
  SchemaDefinitionProperty,
  Types,
} from "mongoose";

// * override user,account,category because they are refrences not objects with their own keys
type overridedType = {
  // * Relations ============= >
  user: SchemaDefinitionProperty<Types.ObjectId>;
  account: SchemaDefinitionProperty<Types.ObjectId>;
  category: SchemaDefinitionProperty<Types.ObjectId>;
};
type schemaType = Omit<Transaction_face, "user" | "account" | "category"> &
  overridedType;
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
    category: {
      type: Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const transaction_model =
  models.Transaction || model<schemaType>("Transaction", transaction_schema);

export { transaction_model, transaction_schema };

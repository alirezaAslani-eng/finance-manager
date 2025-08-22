import { Transaction_face } from "@/types/transaction.types";
import m, {
  model,
  models,
  Schema,
  SchemaDefinitionProperty,
  Types,
} from "mongoose";

// override user because it's a refrence not a object with it's own keys 
type overridedType = { user: SchemaDefinitionProperty<Types.ObjectId> };
type schemaType = Omit<Transaction_face, "user"> & overridedType;
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
  },
  { timestamps: true }
);

const transaction_model =
  models.Transaction ||
  model<schemaType>("Transaction", transaction_schema);

export { transaction_model, transaction_schema };

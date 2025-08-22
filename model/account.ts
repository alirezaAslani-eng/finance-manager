import { Account_face } from "@/types/account.types";
import {
  model,
  models,
  Schema,
  Types,
  SchemaDefinitionProperty,
} from "mongoose";

// * overrided types ============== >
type overridedType = { user: SchemaDefinitionProperty<Types.ObjectId> };
// * schema type ==================== >
type schemaType = Omit<Account_face, "user"> & overridedType;

const account_schema = new Schema<schemaType>(
  {
    accountName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    cardNumber: {
      type: String,
      required: true,
      match: /^[0-9]{16}$/,
      index: true,
      unique: true,
    },
    currentBalance: { type: Number, required: true, min: 0 },
    user: {
      type: Types.ObjectId,
    },
  },
  { timestamps: true }
);

const account_model =
  models.Account || model<schemaType>("Account", account_schema);

export { account_model, account_schema };

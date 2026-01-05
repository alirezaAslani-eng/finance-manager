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
    currentBalance: { type: Number, required: true, min: 0 },
    isActive: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Types.ObjectId,
    },
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
      unique: true,
    },
    bankIcon: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

const account_model =
  models.Account || model<schemaType>("Account", account_schema);

export { account_model, account_schema };

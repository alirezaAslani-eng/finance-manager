import { accountRule } from "@/lib/validations/rules";
import { Account_face } from "@/types/account.types";
import { model, models, Schema } from "mongoose";

const schema = new Schema(accountRule, { timestamps: true });

const account_model = models.Account || model<Account_face>("Account", schema);

export default account_model;

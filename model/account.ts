import { Account_face } from "@/types/account.types";
import m, { model, models, Schema } from "mongoose";

const schema = new Schema<Account_face>({});

const account_model = models.Account || model("Account", schema);

export default account_model;

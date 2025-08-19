import { transactionRule } from "@/lib/validations/rules";
import { Transaction_face } from "@/types/transaction.types";
import m, { model, models, Schema } from "mongoose";

const schema = new Schema(transactionRule);

const transaction_model = models.Transaction || model<Transaction_face>("Transaction", schema);

export default transaction_model;
import { Transaction_face } from "@/types/transaction.types";
import m, { model, models, Schema } from "mongoose";

const schema = new Schema<Transaction_face>({});

const transaction_model = models.transaction || model("Transaction", schema);

export default transaction_model;
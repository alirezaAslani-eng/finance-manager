import { transaction_model, transaction_schema } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";
// * TransAction schema type
type TransActionType = InferSchemaType<typeof transaction_schema>;
const transactionServices = {
  async createTransaction(body: TransActionType) {
    await conect();
    const create_res = await transaction_model.create(body);
    return create_res;
  },
  async removeTransaction(_id: any) {
    const remove_res = await transaction_model.findOneAndDelete({ _id });
    return remove_res;
  },
  async editOneTransaction(_id: any, body: TransActionType) {
    await conect();
    const update_res = await transaction_model.findOneAndUpdate({ _id }, body);
    return update_res;
  },
  async getTransactions() {
    await conect();
    const get_res = await transaction_model
      .find({}, "-__v")
      .populate({ path: "user", select: "fullName" });
    return get_res;
  },
  async getOneTransaction(_id: any) {
    await conect();
    const get_res = await transaction_model.findOne({ _id });
    return get_res;
  },
};

export default transactionServices;

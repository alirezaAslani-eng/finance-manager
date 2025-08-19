import { transaction_model } from "@/model";
import { conect } from "../db";
import { transactionRule } from "../validations/rules";

const transactionServices = {
  async createTransaction(body: typeof transactionRule) {
    await conect();
    const create_res = await transaction_model.create(body);
    return create_res;
  },
  async removeTransaction(_id: any) {
    const remove_res = await transaction_model.findOneAndDelete({ _id });
    return remove_res;
  },
  async editOneTransaction(_id: any, body: typeof transactionRule) {
    await conect();
    const update_res = await transaction_model.findOneAndUpdate({ _id }, body);
    return update_res;
  },
  async getTransactions() {
    await conect();
    const get_res = await transaction_model.find();
    return get_res;
  },
  async getOneTransaction(_id: any) {
    await conect();
    const get_res = await transaction_model.findOne({ _id });
    return get_res;
  },
};

export default transactionServices;

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
  async editTransaction() {
    await conect();
  },
  async getTransactions() {
    await conect();
  },
};

export default transactionServices;

import { transaction_model } from "@/model";
import { conect } from "../db";
import { transactionRule } from "../validations/rules";

const transactionServices = {
  async createTransaction(body: typeof transactionRule) {
    await conect();
    const create_res = await transaction_model.create(body);
    return create_res;
  },
  async removeTransaction() {},
  async editTransaction() {
    await conect();
  },
  async getTransactions() {
    await conect();
  },
};

export default transactionServices;

import { conect } from "../db";

const transactionServices = {
  async createTransaction() {
    await conect();
  },
  async removeTransaction() {
    await conect();
  },
  async editTransaction() {
    await conect();
  },
  async getTransactions() {
    await conect();
  },
};

export default transactionServices;

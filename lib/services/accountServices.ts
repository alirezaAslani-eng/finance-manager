import { account_model } from "@/model";
import { conect } from "../db";
import { accountRule } from "../validations/rules";

const accountServices = {
  async createAccount(accountInfo: typeof accountRule) {
    await conect();
    const create_res = await account_model.create(accountInfo);
    return create_res;
  },
  async removeAccount() {
    await conect();
  },
  async editAccount() {
    await conect();
  },
  async getAccounts() {
    await conect();
  },
};

export default accountServices;

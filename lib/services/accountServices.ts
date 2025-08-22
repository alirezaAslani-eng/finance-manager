import { account_model, account_schema } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";

// * Accoun Schema typpe ============== >
type Account_type = InferSchemaType<typeof account_schema>;
const accountServices = {
  async createAccount(accountInfo: Account_type) {
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
    const get_res = await account_model.find()
    return get_res
  },
};

export default accountServices;

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
  async removeAccount(_id: any) {
    await conect();
    const dl_res = await account_model.findOneAndDelete({ _id });
    return dl_res;
  },
  async editAccount(_id: any, body: Account_type) {
    await conect();
    const edit_res = await account_model.findOneAndUpdate({ _id }, body);
    return edit_res;
  },
  async getOneAccount(_id: any) {
    await conect();
    const get_res = await account_model.findOne({ _id });
    return get_res;
  },
};

export default accountServices;

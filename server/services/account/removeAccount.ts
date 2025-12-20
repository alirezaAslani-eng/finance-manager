import { conect } from "@/server/db";
import { RemoveAccount } from "./types";
import { account_model } from "@/model";

const removeAccount: RemoveAccount = async (_id) => {
  await conect();
  await account_model.findOneAndDelete({ _id });
};

export default removeAccount;

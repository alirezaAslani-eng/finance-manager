import { account_model } from "@/model";
import { IsFirstAccount } from "./types";
import { conect } from "@/server/db";

const isFirstAccount: IsFirstAccount = async (userID) => {
  await conect();
  const isFirst = await account_model.findOne({ user: userID });
  return !!!isFirst;
};

export default isFirstAccount;

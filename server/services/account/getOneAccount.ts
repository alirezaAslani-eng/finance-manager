import { conect } from "@/server/db";
import { GetOneAccount, GetOneAccountOutput } from "./types";
import { isValidObjectId } from "mongoose";
import { account_model } from "@/server/models";

const getOneAccount: GetOneAccount = async (_id) => {
  await conect();
  const isValidId = isValidObjectId(_id);
  if (!isValidId) return null;
  const get_res = await account_model.findOne({ _id }, undefined, {
    select: "accountName cardNumber currentBalance -_id",
  });
  const accountInfo: GetOneAccountOutput = {
    accountName: get_res.accountName,
    cardNumber: get_res.cardNumber,
    currentBalance: get_res.currentBalance,
  };
  return accountInfo;
};

export default getOneAccount;

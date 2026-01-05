import { conect } from "@/server/db";
import { GetOneTransaction } from "./types";
import { transaction_model } from "@/server/models";
import { OneTransactionInfo } from "@/types/transaction.types";

const getOneTransaction: GetOneTransaction = async (_id: any) => {
  await conect();
  const get_res = await transaction_model
    .findOne({ _id }, undefined, { select: "-__v" })
    .populate({ path: "account", select: "-createdAt -updatedAt -__v" })
    .populate({ path: "category", select: "-createdAt -updatedAt -__v" })
    .lean<OneTransactionInfo>();
  return get_res;
};

export default getOneTransaction;

import { conect } from "@/server/db";
import { transaction_model } from "@/server/models";
import { EditOldTransaction } from "./types";
import { toSerializable } from "@/lib/utils";
import { getChangedKeys } from "@/utils";

const editOldTransaction: EditOldTransaction = async (
  _id,
  info
): Promise<void> => {
  await conect();
  const oldTransaction = await transaction_model.findOne({ _id });

  const changedFields = getChangedKeys(toSerializable(oldTransaction), info);
  if (!changedFields || !Object.keys(changedFields)?.length) return; // * when user changed nothing <<

  await transaction_model.findOneAndUpdate({ _id }, { $set: info });
};

export default editOldTransaction;

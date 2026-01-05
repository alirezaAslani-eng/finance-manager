import { conect } from "@/server/db";
import { EditAccount } from "./types";
import { account_model } from "@/server/models";
import { getChangedKeys } from "@/utils";
import { toSerializable } from "@/lib/utils";
import { isUniqueCardNumber } from "@/server/services";
import { throwError } from "@/server/utils";

const editAccount: EditAccount = async (_id, body) => {
  await conect();
  // * find the document that will be updated because we need to check which field has updated value ============= >
  const willEdit = await account_model.findOne({ _id }, undefined, {
    select: "cardNumber accountName currentBalance",
  });
  // * Updated Keys ===================== >
  const updatedFields = getChangedKeys(toSerializable(willEdit), body);

  // * Check unique if user changed card number ============== >
  if (updatedFields?.cardNumber) {
    // * cardNumber Field must be Unique ============== >
    const isUnique = await isUniqueCardNumber(updatedFields.cardNumber);
    throwError(!isUnique, {
      message: "شماره کارت صحیح نمیباشد",
      statusCode: 409,
      type: "client",
    });
  }

  // * Edit Query ================== >
  const edit_res = await account_model.findOneAndUpdate(
    { _id },
    { $set: updatedFields }
  );
  return edit_res;
};

export default editAccount;

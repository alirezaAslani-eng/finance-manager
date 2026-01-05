import { conect } from "@/server/db";
import { CreateAccount, CreateAccountOutput } from "./types";
import { throwError } from "@/server/utils";
import { isFirstAccount, isUniqueCardNumber } from "@/server/services";
import { account_model } from "@/server/models";

const createAccount: CreateAccount = async (
  info,
  options = { uniqCheck: true }
) => {
  const { uniqCheck } = options;
  const { cardNumber, user } = info;
  await conect();

  // * cardNumber Field must be Unique ============== >
  if (uniqCheck) {
    const isUnique = await isUniqueCardNumber(cardNumber);
    throwError(!isUnique, {
      message: "شماره کارت صحیح نمیباشد",
      statusCode: 409,
      type: "client",
    });
  }

  // * First user's card must be active =============== >
  const isActive = await isFirstAccount(user as string);

  // * Create Query ================ >
  const create_res = await account_model.create({
    ...info,
    cardNumber: cardNumber.trim(),
    isActive,
  });

  const createdInfo: CreateAccountOutput = {
    accountName: create_res.accountName,
    bankIcon: create_res.bankIcon,
    bankName: create_res.bankName,
    cardNumber: create_res.cardNumber,
    currentBalance: create_res.currentBalance,
    isActive: create_res.isActive,
    user: create_res.user,
  };
  return createdInfo;
};
export default createAccount;

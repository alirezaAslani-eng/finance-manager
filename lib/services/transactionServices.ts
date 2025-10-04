import {
  account_model,
  account_schema,
  category_model,
  transaction_model,
  transaction_schema,
} from "@/model";
import { conect } from "../db";
import type { InferSchemaType, Document } from "mongoose";
import { checkExist, throwError } from "../utils";
import { RecentTransactionType } from "@/types/transaction.types";
// * TransAction schema type
type TransActionType = InferSchemaType<typeof transaction_schema>;
type AccountType = InferSchemaType<typeof account_schema>;

const amountHandler = async (
  body: Omit<TransActionType, "accountBalance">
): Promise<number> => {
  // * Check (account) it must be valid as _id and existed in colection =============== >
  const account = await checkExist<AccountType>(account_model, {
    _id: body.account,
  }); // ! Might Throw Error =================== <

  // * accountBalance field gets value base on current account's balance ========================= >
  // * amount of transaction >>
  let amount = 0;
  // * type 0 = spend / type 1 = income ================= >
  if (body.type == "0") {
    throwError(account.currentBalance <= 0, {
      message:
        "مجودی حساب برای ثبت تراکنش کافی نمیباشد لطفا مجودی فعلی را افزایش دهید",
      statusCode: 400,
      type: "client",
    }); // ! Might Throw Error =================== <
    amount = account.currentBalance - body.amount; // * Decrease -
  } else if (body.type == "1") {
    amount = account.currentBalance + body.amount; // * Increase +
  }

  // * change the current balance of user's account ============================== >
  await account_model.findOneAndUpdate({ _id: body.account }, {
    currentBalance: amount,
  } as Pick<AccountType, "currentBalance">);

  return amount;
};

const transactionServices = {
  async createTransaction(body: Omit<TransActionType, "accountBalance">) {
    await conect();

    await checkExist(category_model, { _id: body.category }); // ! Might Throw Error ====================== <
    const amount = await amountHandler(body);
    // * Create A Transaction ============================================== >
    const create_res = await transaction_model.create({
      ...body,
      accountBalance: amount,
    } as TransActionType);

    // * reset variable ==== >

    return create_res;
  },
  async removeTransaction(_id: any) {
    const remove_res = await transaction_model.findOneAndDelete({ _id });
    return remove_res;
  },
  async editOneTransaction(
    _id: any,
    body: Omit<TransActionType, "accountBalance">
  ) {
    await conect();
    // * Check (category) it must be valid an _id and existed =============== >
    await checkExist(category_model, { _id: body.category }); // ! Might Throw Error ====================== <

    // * get final amount of transaction it could be decrased or increased ====================== >
    const amount = await amountHandler(body); // ! Might Throw Error ====================== <

    // * Start Updating Document ======================== >
    const updatedInfo: TransActionType = { ...body, accountBalance: amount };
    const update_res = await transaction_model.findOneAndUpdate(
      { _id },
      updatedInfo
    );
    return update_res;
  },
  async getTransactions(userID: string) {
    await conect();

    const get_res = await transaction_model
      .find({ user: userID }, "-__v")
      .populate({ path: "user", select: "fullName" })
      .populate({ path: "account", select: "-__v" });
    return get_res;
  },
  async getOneTransaction(_id: any) {
    await conect();
    const get_res = await transaction_model.findOne({ _id });
    return get_res;
  },
  async getRecentTransaction(userID: string): Promise<RecentTransactionType[]> {
    await conect();
    const recentTransaction = await transaction_model
      .find({ user: userID }, undefined, {
        select: "-__v -account -accountBalance",
      })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean<RecentTransactionType[]>();
    return recentTransaction;
  },
};

export default transactionServices;

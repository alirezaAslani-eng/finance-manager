import { account_model, account_schema } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";
import { throwError } from "../utils";

// * Account Schema type ============== >
type Account_type = InferSchemaType<typeof account_schema>;

const accountServices = {
  async isUniqueCardNumber(cardNumber: string): Promise<boolean> {
    // * cardNumber Field must be Unique ============== >
    const isUnique = await account_model.findOne({
      cardNumber: cardNumber.trim(),
    });
    return !!!isUnique;
  },

  createAccount: async function (accountInfo: Account_type) {
    const { cardNumber } = accountInfo;
    await conect();

    // * cardNumber Field must be Unique ============== >
    const isUnique = await accountServices.isUniqueCardNumber(cardNumber);
    throwError(!isUnique, {
      message: "شماره کارت صحیح نمیباشد",
      statusCode: 409,
      type: "client",
    });

    // * Create Query ================ >
    const create_res = await account_model.create({
      ...accountInfo,
      cardNumber: cardNumber.trim(),
    });
    return create_res;
  },

  async removeAccount(_id: any) {
    await conect();
    const dl_res = await account_model.findOneAndDelete({ _id });
    return dl_res;
  },

  async editAccount(_id: any, body: Account_type) {
    await conect();
    const { cardNumber } = body;

    // * cardNumber Field must be Unique ============== >
    const isUnique = await accountServices.isUniqueCardNumber(cardNumber);
    throwError(!isUnique, {
      message: "شماره کارت صحیح نمیباشد",
      statusCode: 409,
      type: "client",
    });

    // * Edit Query ================== >
    const edit_res = await account_model.findOneAndUpdate(
      { _id },
      {
        ...body,
        cardNumber: cardNumber.trim(),
      }
    );
    return edit_res;
  },

  async getOneAccount(_id: any) {
    await conect();
    const get_res = await account_model.findOne({ _id });
    return get_res;
  },
  async hasAccount(userID: string) {
    const userHasAccount = await account_model.findOne({ user: userID });
    return !!userHasAccount;
  },
};

export default accountServices;

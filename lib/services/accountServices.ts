import { account_model, account_schema } from "@/model";
import { conect } from "../db";
import { isValidObjectId, type InferSchemaType } from "mongoose";
import { throwError } from "@/server/utils";
import { toSerializable } from "@/lib/utils";
import { ServiceOptions } from "./types/services.types";
import { AccountSchemaType } from "../validations/accountSchema";
import { getChangedKeys } from "@/utils";
import { identyfyBank } from "@/utils";
import { Bank } from "@/constant";
// * Account Schema type ============== >
type InputAccount_type = Pick<
  InferSchemaType<typeof account_schema>,
  | "accountName"
  | "cardNumber"
  | "currentBalance"
  | "user"
  | "bankIcon"
  | "bankName"
>;
type Account_type = InferSchemaType<typeof account_schema>;

const accountServices = {
  async isUniqueCardNumber(cardNumber: string): Promise<boolean> {
    // * cardNumber Field must be Unique ============== >
    const isUnique = await account_model.findOne({
      cardNumber: cardNumber.trim(),
    });
    return !!!isUnique;
  },

  async isFirstAccount(userID: string) {
    await conect();
    const isFirst = await account_model.findOne({ user: userID });
    return !!!isFirst;
  },
  async findActiveAccount(userID: string) {
    await conect();
    const findedAccount = await account_model.findOne(
      {
        user: userID,
        isActive: true,
      },
      undefined,
      { select: "user _id" }
    );
    return findedAccount as
      | (Pick<Account_type, "user"> & { _id: string })
      | null;
  },
  async changeActiveAccount(userID: string, accountID: string) {
    await conect();
    //  * Find previous Actived Account and unActive it=================== >
    await account_model
      .findOneAndUpdate(
        {
          user: userID,
          isActive: true,
        } as Partial<Account_type>,
        { isActive: false } as Partial<Account_type>
      )
      .lean();
    // * Active requested account ==================== >
    await account_model.findOneAndUpdate(
      {
        _id: accountID,
        user: userID,
      } as Partial<Account_type> & { _id: string },
      { isActive: true } as Partial<Account_type>
    );
  },
  createAccount: async function (
    accountInfo: InputAccount_type,
    options: Pick<ServiceOptions, "uniqCheck"> = {}
  ) {
    const { uniqCheck = true } = options;
    const { cardNumber, user } = accountInfo;
    await conect();

    // * cardNumber Field must be Unique ============== >
    if (uniqCheck) {
      const isUnique = await accountServices.isUniqueCardNumber(cardNumber);
      throwError(!isUnique, {
        message: "شماره کارت صحیح نمیباشد",
        statusCode: 409,
        type: "client",
      });
    }

    // * First user's card must be active =============== >
    const isActive = await accountServices.isFirstAccount(user as string);

    // * Create Query ================ >
    const create_res = await account_model.create({
      ...accountInfo,
      cardNumber: cardNumber.trim(),
      isActive,
    } as Account_type);
    return create_res;
  },

  async removeAccount(_id: any) {
    await conect();
    const dl_res = await account_model.findOneAndDelete({ _id });
    return dl_res;
  },

  async editAccount(_id: any, body: Omit<InputAccount_type, "user">) {
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
      const isUnique = await accountServices.isUniqueCardNumber(
        updatedFields.cardNumber
      );
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
  },

  async getOneAccount(_id: any) {
    await conect();
    const isValidId = isValidObjectId(_id);
    if (!isValidId) return null;
    const get_res = await account_model.findOne({ _id }, undefined, {
      select: "accountName cardNumber currentBalance -_id",
    });
    return get_res as AccountSchemaType | null;
  },
  async hasAccount(userID: string) {
    const userHasAccount = await account_model.findOne({ user: userID });
    return !!userHasAccount;
  },
  IdentyfyAccount(cardNumber: string): Bank | undefined {
    const accountDetails = identyfyBank(cardNumber);
    return accountDetails;
  },
};

export default accountServices;

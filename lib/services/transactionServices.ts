import {
  account_model,
  account_schema,
  category_model,
  transaction_model,
  transaction_schema,
} from "@/model";
import { conect } from "../db";
import {
  startSession,
  type ClientSession,
  type InferSchemaType,
} from "mongoose";
import { checkExist, sessionHandler, throwError } from "../utils";
import { RecentTransactionType } from "@/types/transaction.types";
import accountServices from "./accountServices";
import { GetOneTransactionServiceType } from "./types/services.types";
// * TransAction schema type
type TransActionType = InferSchemaType<typeof transaction_schema>;
type AccountType = InferSchemaType<typeof account_schema>;

/**
 * it decreases or increases the current balance and retirn it
 */
const amountHandler = async (
  body: Omit<TransActionType, "accountBalance" | "isLatest">,
  session?: ClientSession
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
    throwError(account.currentBalance - body.amount < 0, {
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
  await account_model.findOneAndUpdate(
    { _id: body.account },
    {
      currentBalance: amount,
    } as Pick<AccountType, "currentBalance">,
    { session }
  );

  return amount;
};

const transactionServices = {
  async createTransaction(
    body: Omit<TransActionType, "accountBalance" | "isLatest">
  ) {
    await conect();
    // * Start Session ============= >
    const session = await startSession();
    session.startTransaction();
    const create_result = await sessionHandler(session, {
      _try: async () => {
        await checkExist(category_model, { _id: body.category }); // ! Might Throw Error ====================== <

        const amount = await amountHandler(body, session); // ! Might Throw Error ====================== <

        // * Find Latest Transaction and false it ===== >
        await transaction_model.findOneAndUpdate(
          {
            user: body.user,
            account: body.account,
            isLatest: true,
          },
          { isLatest: false },
          { session }
        );
        // * Create Latest Transaction ============================================== >
        const [created] = await transaction_model.create(
          [
            {
              ...body,
              accountBalance: amount,
              isLatest: true,
            } as TransActionType,
          ],
          { session }
        );
        // * Successfull result =============== >
        await session.commitTransaction();
        return created;
      },
    });
    return create_result;
  },
  async removeTransaction(_id: string) {
    await conect();
    const session = await startSession();
    session.startTransaction();
    await sessionHandler(session, {
      _try: async () => {
        // * Find Transaction ============= >
        const transaction = await transaction_model.findOne({ _id });

        // * Check if it's latest transaction ========== >>>>
        throwError(!transaction.isLatest, {
          message: "فقط آخرین تراکنش مجاز به حذف هست",
          statusCode: 409,
          type: "client",
        }); // ! Might Throw Error <<<<<<<<

        // * Update balance =================== >
        await transactionServices.changeCurrentBalance(
          transaction.account,
          transaction.type == "0" ? transaction.amount : -transaction.amount,
          session
        );

        // * Remove Transaction ============ >
        await transaction_model.findOneAndDelete({ _id }, { session });

        // * Update Latest Tranasction ============ >
        await transaction_model.findOneAndUpdate(
          { account: transaction.account },
          { $set: { isLatest: true } },
          { session, sort: { createdAt: -1 } }
        );

        // * Finish =============== >
        await session.commitTransaction();
      },
    });
  },

  async changeCurrentBalance(
    accountID: string,
    incOrDecNumber: number,
    session?: ClientSession
  ) {
    await account_model.findOneAndUpdate(
      { _id: accountID },
      // * increase or decrease ================= >
      {
        $inc: {
          currentBalance: incOrDecNumber,
        } as Partial<AccountType>,
      },
      { session }
    );
  },
  async editOneTransaction(
    _id: any,
    body: Pick<TransActionType, "category" | "reason">
  ) {
    await conect();
    // * Only Edit "reason" and "category" ============= >
    await transaction_model.findOneAndUpdate({ _id }, body);
  },
  async getTransactions(userID: string) {
    await conect();

    const get_res = await transaction_model
      .find({ user: userID }, "-__v")
      .populate({ path: "account", select: "-__v" });
    return get_res;
  },
  async getOneTransaction(
    _id: any
  ): Promise<GetOneTransactionServiceType | null> {
    await conect();
    const get_res = await transaction_model
      .findOne({ _id }, undefined, { select: "-__v" })
      .populate({ path: "account", select: "-createdAt -updatedAt -__v" })
      .populate({ path: "category", select: "-createdAt -updatedAt -__v" })
      .lean<GetOneTransactionServiceType>();
    return get_res;
  },
  async getRecentTransaction(userID: string): Promise<RecentTransactionType[]> {
    await conect();
    // * Find user's actived Account =============== >
    const { findActiveAccount } = accountServices;
    const activedAccount = await findActiveAccount(userID);

    // * Get recent transaction based on user's actived acount's _id ========== >
    const recentTransaction = await transaction_model
      .find({ user: userID, account: activedAccount?._id }, undefined, {
        select: "-__v -accountBalance -updatedAt",
      })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean<RecentTransactionType[]>();
    return recentTransaction;
  },
};

export default transactionServices;

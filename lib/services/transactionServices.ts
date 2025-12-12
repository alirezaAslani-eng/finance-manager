import {
  account_model,
  account_schema,
  category_model,
  transaction_model,
  transaction_schema,
} from "@/model";
import { conect } from "../db";
import mongoose from "mongoose";
import type { ClientSession, InferSchemaType, RootFilterQuery } from "mongoose";
import {
  checkExist,
  parseDoc,
  sessionHandler,
  throwError,
  transactionFilterHandler,
} from "../utils";
import {
  MongoTransaction,
  RecentTransactionType,
  Transaction_face,
} from "@/types/transaction.types";
import accountServices from "./accountServices";
import {
  GetOneTransactionServiceType,
  InitialTransationsServiceOutPut,
  LoadMoreTransactionServiceOutPut,
} from "./types/services.types";
import { getChangedKeys } from "@/utils";
import { transactionCursorConfig } from "@/constant";
import { FilterSchemaType } from "../validations/transactionSchema";
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
  const account = await checkExist<AccountType>(
    account_model,
    {
      _id: body.account,
    },
    "invalid account id",
    { session }
  ); // ! Might Throw Error =================== <

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

interface CutRelationProps {
  accountId: string;
  amount: number;
  type: Transaction_face["type"];
}
const cutRelation = async (
  { accountId, amount, type }: CutRelationProps,
  session?: ClientSession
) => {
  // * This Method removes the Effect of a ransaction on an account ================= >
  if (type == "0") {
    // * If user spend : return it back
    await account_model.findOneAndUpdate(
      { _id: accountId },
      { $inc: { currentBalance: amount } as Partial<AccountType> },
      { session }
    );
  } else if (type == "1") {
    // * If user get income : decrease balance
    await account_model.findOneAndUpdate(
      { _id: accountId },
      { $inc: { currentBalance: -amount } as Partial<AccountType> },
      { session }
    );
  }
};
const transactionServices = {
  async createTransaction(
    body: Omit<TransActionType, "accountBalance" | "isLatest">
  ) {
    const con = await conect();
    // * Start Session ============= >
    const session = await con.startSession();
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
    const con = await conect();
    const session = await con.startSession();
    session.startTransaction();
    await sessionHandler(session, {
      _try: async () => {
        // * Find Transaction ============= >
        const transaction = await transaction_model.findOne(
          { _id },
          undefined,
          { session }
        );

        // * Check if it's latest transaction ========== >>>>
        throwError(!transaction.isLatest, {
          message: "فقط آخرین تراکنش مجاز به حذف هست",
          statusCode: 403,
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
  async editOldTransaction(
    _id: any,
    body: Pick<TransActionType, "category" | "reason">
  ): Promise<void> {
    await conect();
    const oldTransaction = await transaction_model.findOne({ _id });

    const changedFields = getChangedKeys(parseDoc(oldTransaction), body);
    if (!changedFields || !Object.keys(changedFields)?.length) return; // * when user changed nothing <<

    await transaction_model.findOneAndUpdate({ _id }, { $set: body });
  },
  async editLatestTransaction(
    _id: any,
    body: Pick<TransActionType, "category" | "reason" | "amount" | "type">
  ) {
    const con = await conect();

    // * Get Old transaction ================ >
    const oldTransaction = await transaction_model.findOne({ _id });
    const parsedOldTransaction = parseDoc(oldTransaction);

    // * Get Fields user Changed =============== >
    const changedFields = getChangedKeys(parsedOldTransaction, body);
    if (!changedFields || !Object.keys(changedFields)?.length) return; // * when user changed nothing <<

    if (changedFields?.amount || changedFields?.type) {
      const session = await con.startSession();
      session.startTransaction();
      // * Edit Session ============= >
      await sessionHandler(session, {
        _try: async () => {
          // * Cut Relation between olDtransaction and account =================== >
          await cutRelation(
            {
              accountId: parsedOldTransaction.account as string,
              amount: parsedOldTransaction.amount,
              type: parsedOldTransaction.type,
            },
            session
          );
          // * Merg changed updated fields and old fields ================ >
          const updatedInfo = { ...parsedOldTransaction, ...body };

          // * Add New Relation and apply changes on account ======== >
          const accountBalance = await amountHandler(updatedInfo, session); // ! Might Throw Error <<<<<

          // * Update Transaction ================ >
          await transaction_model.findOneAndUpdate(
            { _id },
            { $set: { ...changedFields, accountBalance } },
            { session }
          ); // * Commit Session ================ >
          await session.commitTransaction();
        },
      });
    } else {
      // * If user just changed reason or category ============ >
      await transaction_model.findOneAndUpdate(
        { _id },
        { $set: changedFields }
      );
    }
  },
  async isLatestTransaction(
    _id: string,
    session?: ClientSession
  ): Promise<boolean> {
    const transaction = await transaction_model.findOne(
      {
        _id,
        isLatest: true,
      },
      undefined,
      { session }
    );
    return !!transaction;
  },

  async initialTransactions(
    userID: string,
    queries: FilterSchemaType
  ): InitialTransationsServiceOutPut {
    await conect();
    // *  Queries and sort ======== >>>
    const { query, sort_id, resetFilter } = transactionFilterHandler({
      defaultQuery: { user: userID },
      queries: queries,
    });

    // * initial load is limited only 50 transactions maybe with filters----- >
    const initial_transactions = await transaction_model
      .find(query, "-__v -updatedAt -accountBalance")
      // * Latest -- >
      .sort({ _id: sort_id })
      // * Limitation --- >
      .limit(transactionCursorConfig.initialLimit)
      .populate("category", "-__v -user")
      .lean<MongoTransaction[]>();

    // * Clean up Filters ======== >
    resetFilter();

    // * Return ============== >
    return {
      initial_transactions: parseDoc(initial_transactions),
      nextCursor: parseDoc(
        initial_transactions[initial_transactions.length - 1]?._id ?? null
      ),
    };
  },
  async loadMoreTransactions(
    lastID: string, // * Last _id of loaded transaction <<
    userID: string,
    queries: FilterSchemaType
  ): LoadMoreTransactionServiceOutPut {
    await conect();

    // *  Query and sort ======== >>>
    const { query, sort_id, resetFilter } = transactionFilterHandler({
      defaultQuery: { user: userID },
      queries: queries,
    });

    // * Load More Query With Filters ================= >
    const more_transactions = await transaction_model
      .find(
        {
          ...query,
          _id:
            sort_id == -1
              ? { $lt: new mongoose.Types.ObjectId(lastID) }
              : { $gt: new mongoose.Types.ObjectId(lastID) },
        },
        "-__v -updatedAt -accountBalance"
      )
      // * Latest --- >
      .sort({ _id: sort_id })
      // * load only 20 transaction more ---- >
      .limit(transactionCursorConfig.loadMoreLimit)
      .populate("category", "-__v -user")
      .lean<MongoTransaction[]>();

    // * Clean up Filters ============== >
    resetFilter();

    // * Return Next Cursor ==== >
    return {
      more_transactions: parseDoc(more_transactions),
      nextCursor: parseDoc(
        more_transactions[more_transactions.length - 1]?._id ?? null
      ),
    };
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

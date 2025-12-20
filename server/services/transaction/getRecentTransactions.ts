import { conect } from "@/server/db";
import { GetRecentTransactions } from "./types";
import { findActiveAccount } from "@/server/services";
import { transaction_model } from "@/model";
import { RecentTransactionType } from "@/types/transaction.types";

const getRecentTransaction: GetRecentTransactions = async (userID) => {
  await conect();
  // * Find user's actived Account =============== >
  const activedAccount = await findActiveAccount(userID);

  // * Get recent transaction based on user's actived acount ========== >
  const recentTransaction = await transaction_model
    .find({ user: userID, account: activedAccount?._id }, undefined, {
      select: "-__v -accountBalance -updatedAt",
    })
    .populate("category")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean<RecentTransactionType[]>();
  return recentTransaction;
};

export default getRecentTransaction;

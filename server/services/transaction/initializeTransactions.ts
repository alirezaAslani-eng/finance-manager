import { transactionCursorConfig } from "@/constant";
import { InitializeTransactions } from "./types";
import { transaction_model } from "@/model";
import { TransactionList } from "@/types/transaction.types";
import { conect } from "@/server/db";
import { buildTransactionFilterQuery } from "@/server/utils";
import { toSerializable } from "@/lib/utils";

const initialTransactions: InitializeTransactions = async (userID, queries) => {
  await conect();
  // *  Queries and sort ======== >>>
  const { query, sort_id, resetFilter } = buildTransactionFilterQuery({
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
    .lean();

  // * Clean up Filters ======== >
  resetFilter();

  // * Return ============== >
  return {
    initial_transactions: toSerializable<TransactionList>(initial_transactions),
    nextCursor: toSerializable(
      initial_transactions[initial_transactions.length - 1]?._id ?? null
    ),
  };
};

export default initialTransactions;

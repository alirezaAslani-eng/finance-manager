import { conect } from "@/server/db";
import { LoadMoreTransactions } from "./types";
import { buildTransactionFilterQuery } from "@/server/utils";
import { transaction_model } from "@/model";
import mongoose from "mongoose";
import { transactionCursorConfig } from "@/constant";
import { MongoTransaction } from "@/types/transaction.types";
import { toSerializable } from "@/lib/utils";

const loadMoreTransactions: LoadMoreTransactions = async (
  lastID, // * Last _id of loaded transaction <<
  userID,
  queries
) => {
  await conect();

  // *  Query and sort ======== >>>
  const { query, sort_id, resetFilter } = buildTransactionFilterQuery({
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
    more_transactions: toSerializable(more_transactions),
    nextCursor: toSerializable(
      more_transactions[more_transactions.length - 1]?._id ?? null
    ),
  };
};


export default loadMoreTransactions
import { transactionServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
import {
  AllTransactionResponse,
  FilteredTransactionResonse,
  TrnasactionFilterURLQueries,
} from "../../../../types/api/transactionApi.types";
import { allTransactionsConfig } from "@/lib/constant";
const handler: handler_type = async (req, res) => {
  const lastTransactionId = req.query.id as string;
  const { loadMoreTransactions, initialTransactions } = transactionServices;
  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  }); // ! Might throw Error <<<<<<<<

  // * Filter Queries and Filter State =========== >
  const isFiltered = req.query?.filter == "true";
  const queries: Omit<TrnasactionFilterURLQueries, "filter"> = {
    accounts: req.query?.accounts,
    categories: req.query?.categories,
    fromDate: req.query?.fromDate,
    maxAmount: req.query?.maxAmount,
    minAmount: req.query?.minAmount,
    old: req.query?.old,
    toDate: req.query?.toDate,
    type: req.query?.type,
  };
  console.log("LOG -> Queries", queries);

  switch (req.method as "GET") {
    case "GET": {
      if (lastTransactionId != "null") {
        // * Check nextCursor which is _id ================== >
        throwError(!isValidObjectId(lastTransactionId), {
          message: "id is not valid",
          statusCode: 400,
          type: "dev",
        }); // ! Might throw Error <<<<<<<<
        //* Run Queries ===== >
        const loadMore = await loadMoreTransactions(
          lastTransactionId,
          payloadInfo._id,
          queries
        );
        const { more_transactions, nextCursor } = loadMore;

        // * Response For Filtered Transactions ===================== >
        if (isFiltered) {
          const filteredTransactions: FilteredTransactionResonse = {
            transactions: more_transactions,
            nextCursor,
            hasMore: !!more_transactions.length,
          } as const;
          return res.status(200).json(filteredTransactions);
        }
        // * Response For Transactions ============================= >
        const transactions: AllTransactionResponse = {
          transactions: more_transactions,
          nextCursor,
          hasMore: !!more_transactions.length,
        };
        return res.json(transactions);
      } else {
        const init = await initialTransactions(payloadInfo._id, queries);

        // * Response ================= >
        const { initial_transactions, nextCursor } = init;

        // * Response for Filtered Transactions ============ >
        if (isFiltered) {
          const filteredTransactions: FilteredTransactionResonse = {
            transactions: initial_transactions,
            nextCursor,
            hasMore:
              initial_transactions.length < allTransactionsConfig.initialLimit
                ? false
                : true,
          } as const;
          return res.json(filteredTransactions);
        }

        // * Response for Transactions ============ >
        const transactions: AllTransactionResponse = {
          transactions: initial_transactions,
          nextCursor,
          hasMore:
            initial_transactions.length < allTransactionsConfig.initialLimit
              ? false
              : true,
        } as const;
        return res.json(transactions);
      }
    }
    default: {
      throwError(true, {
        message: "request method is not allowed",
        statusCode: 405,
        type: "dev",
      });
    }
  }
};

export default apiHandler(handler);

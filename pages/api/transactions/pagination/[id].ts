import { transactionServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
import { AllTransactionResponse } from "../../types/transactionApi.types";
const handler: handler_type = async (req, res) => {
  const lastTransactionId = req.query.id as string;
  const { loadMoreTransactions, initialTransactions } = transactionServices;

  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  });

  switch (req.method as "GET") {
    case "GET": {
      if (lastTransactionId.length) {
        // * Check nextCursor which is _id ================== >
        throwError(!isValidObjectId(lastTransactionId), {
          message: "id is not valid",
          statusCode: 400,
          type: "dev",
        }); // ! Might throw Error <<<<<<<<
        //* Run Queries ===== >
        const loadMore = await loadMoreTransactions(
          lastTransactionId,
          payloadInfo._id
        );
        // * Response ===================== >
        const { more_transactions, nextCursor } = loadMore;
        const response: AllTransactionResponse = {
          transactions: more_transactions,
          nextCursor,
          hasMore: !!more_transactions.length,
        };
        return res.json(response);
      } else {
        const init = await initialTransactions(payloadInfo._id);

        // * Response ================= >
        const { initial_transactions, nextCursor } = init;
        const response: AllTransactionResponse = {
          transactions: initial_transactions,
          nextCursor,
          hasMore: initial_transactions.length < 50 ? false : true,
        };
        return res.json(response);
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

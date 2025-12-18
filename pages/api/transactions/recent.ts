import { transactionServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/server/utils";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
const handler: handler_type = async (req, res) => {
  // * Authorize user ====================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد شوید",
    statusCode: 401,
    type: "client",
  });

  switch (req.method as "GET") {
    case "GET": {
      // * Services =============== >
      const { getRecentTransaction } = transactionServices;

      //  * Get Recent transactions ==================== >
      const recent_transactions = await getRecentTransaction(payloadInfo._id);

      //   * Response =================>
      return res.json(recent_transactions);
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

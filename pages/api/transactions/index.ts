import { transactionServices } from "@/lib/services";
import { apiHandler, verifyUserToken, throwError } from "@/server/utils";
import { transactionSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { createTransaction, loadMoreTransactions } = transactionServices;
  // * Authorize user ====================== >
  const payloadInfo = verifyUserToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد شوید",
    statusCode: 401,
    type: "client",
  });
  switch (req.method as "POST" | "GET") {
    case "POST": {
      // * Body from client ================= >
      const body = req.body;
      // * Zod validator ========================= >
      const { amount, reason, type, account, category } =
        transactionSchema.parse(body); // ! Might Throw Error =================== <

      const create_res = await createTransaction({
        // from client ---- >
        type,
        amount,
        reason,
        account,
        category,
        user: payloadInfo._id, // * Relation <<<
      }); // ! Might Throw Error =================== <

      return res.json(create_res);
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

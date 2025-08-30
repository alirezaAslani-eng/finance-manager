import { transactionServices } from "@/lib/services";
import { apiHandler, checkExist, clientError, payloadToken } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { Transaction_face } from "@/types/transaction.types";
import { PayloadToken_type } from "@/types/user.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { createTransaction, getTransactions } = transactionServices;
  // * Authorize user ====================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  clientError("اول وارد شوید", !payloadInfo, 401);
  switch (req.method as "POST" | "GET") {
    case "POST": {
      // * Body from client ================= >
      const body = req.body;
      // * Zod validator ========================= >
      const { amount, reason, type, account, category } =
        transactionSchema.parse(body);// ! Might Throw Error =================== <

      const create_res = await createTransaction({
        // from client ---- >
        type,
        amount,
        reason,
        account,
        category,
        user: payloadInfo._id, // * Relation <<<
      });// ! Might Throw Error =================== <


      return res.json(create_res);
    }
    case "GET": {
      const get_res = await getTransactions(payloadInfo._id);
      return res.json(get_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

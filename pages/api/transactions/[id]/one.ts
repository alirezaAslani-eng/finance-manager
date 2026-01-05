import {
  removeTransaction,
  getOneTransaction,
  isLatestTransaction,
  editLatestTransaction,
  editOldTransaction,
} from "@/server/services";
import {
  apiHandler,
  checkOwnerOf,
  verifyUserToken,
  throwError,
} from "@/server/utils";
import { editTransactionSchema } from "@/lib/validations";
import { transaction_model } from "@/server/models";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
const handler: handler_type = async (req, res) => {
  const id = req.query.id as string;
  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = verifyUserToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  });
  // * Check params ================== >
  throwError(!isValidObjectId(id), {
    message: "id is not valid",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<
  // * check if they access to mutate a transaction ================= >
  await checkOwnerOf({
    userId: payloadInfo._id,
    modelID: id as string,
    mustBeOwnerOf: transaction_model,
  }); // ! Might Throw Error ====================== <

  switch (req.method as "DELETE" | "GET" | "PUT") {
    case "DELETE": {
      await removeTransaction(id as string); // ! Might Throw Error ====================== <
      return res.status(204).json(null);
    }
    case "GET": {
      const one_res = await getOneTransaction(id); // ! Might Throw Error ====================== <
      return res.json(one_res);
    }
    case "PUT": {
      // * Zod Validation ==================== >
      const { reason, category, amount, type } = editTransactionSchema().parse(
        req.body
      ); // ! Might Throw Error ====================== <

      // * Check is latest transaction ============ >
      const _isLatestTransaction = await isLatestTransaction(id as string);

      // * Edit Transaction ============ >
      if (!_isLatestTransaction) {
        await editOldTransaction(id, { category, reason });
      } else {
        await editLatestTransaction(id, {
          category,
          reason,
          amount,
          type,
        });
      }
      // * Response ============================= >
      return res.status(204).json(true);
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

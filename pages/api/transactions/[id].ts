import { transactionServices } from "@/lib/services";
import { apiHandler, checkOwnerOf, payloadToken, throwError } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { transaction_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { removeTransaction, getOneTransaction, editOneTransaction } =
    transactionServices;

  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  });
  // * Authorize user and check theme if they access to mutate a transaction ================= >
  (await checkOwnerOf({
    userId: payloadInfo._id,
    modelID: req.query.id as string,
    mustBeOwnerOf: transaction_model,
  })) as PayloadToken_type; // ! Might Throw Error ====================== <

  // * Check params ================== >
  throwError(!isValidObjectId(req.query.id), {
    message: "id is not valid",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<

  switch (req.method as "DELETE" | "GET" | "PUT") {
    case "DELETE": {
      await removeTransaction(req.query.id); // ! Might Throw Error ====================== <
      return res.status(204).json(null);
    }
    case "GET": {
      const one_res = await getOneTransaction(req.query.id); // ! Might Throw Error ====================== <
      return res.json(one_res);
    }
    case "PUT": {
      // * Zod Validation ==================== >
      const { amount, reason, type, account, category } =
        transactionSchema.parse(req.body); // ! Might Throw Error ====================== <

      const edit_res = await editOneTransaction(req.query.id, {
        // from client --- >
        amount,
        reason,
        type,
        account,
        category,
        user: payloadInfo._id, // * Relation <<<
      }); // ! Might Throw Error ====================== <

      return res.json(edit_res);
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

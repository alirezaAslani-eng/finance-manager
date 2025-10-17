import { transactionServices } from "@/lib/services";
import {
  apiHandler,
  checkExist,
  checkOwnerOf,
  payloadToken,
  throwError,
} from "@/lib/utils";
import { transactionEditSchema } from "@/lib/validations";
import { category_model, transaction_model } from "@/model";
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
  // * Check params ================== >
  throwError(!isValidObjectId(req.query.id), {
    message: "id is not valid",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<
  // * check if they access to mutate a transaction ================= >
  await checkOwnerOf({
    userId: payloadInfo._id,
    modelID: req.query.id as string,
    mustBeOwnerOf: transaction_model,
  }); // ! Might Throw Error ====================== <

  switch (req.method as "DELETE" | "GET" | "PUT") {
    case "DELETE": {
      await removeTransaction(req.query.id as string); // ! Might Throw Error ====================== <
      return res.status(204).json(null);
    }
    case "GET": {
      const one_res = await getOneTransaction(req.query.id); // ! Might Throw Error ====================== <
      return res.json(one_res);
    }
    case "PUT": {
      // * Zod Validation ==================== >
      const { reason, category } = transactionEditSchema.parse(req.body); // ! Might Throw Error ====================== <

      // * Check (category & account) which are relation for transaction they must be existed =============== >
      await checkExist(category_model, { _id: category }); // ! Might Throw Error ====================== <

      await editOneTransaction(req.query.id, {
        // * from client --- >
        reason,
        category,
      });

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

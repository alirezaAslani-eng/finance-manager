import { transactionServices } from "@/lib/services";
import { apiHandler, checkOwnerOf, clientError } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { transaction_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { removeTransaction, getOneTransaction, editOneTransaction } =
    transactionServices;
  // * Check params ================== >
  clientError(
    "id is invalid (requires ObjectId)",
    !isValidObjectId(req.query.id)
  ); // ! Might Throw Error ====================== <
  // * Authorize user and check theme if they access to mutate a transaction ================= >
  const payloadInfo = (await checkOwnerOf({
    modelID: req.query.id as string,
    mustBeOwnerOf: transaction_model,
    req,
  })) as PayloadToken_type; // ! Might Throw Error ====================== <

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
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

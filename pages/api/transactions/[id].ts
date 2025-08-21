import { transactionServices } from "@/lib/services";
import { apiHandler, clientError } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { Transaction_face } from "@/types/transaction.types";
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
  );
  switch (req.method as "DELETE" | "GET" | "PUT") {
    case "DELETE": {
      const delte_result = await removeTransaction(req.query.id);
      return res.status(204).json(null);
    }
    case "GET": {
      const one_res = await getOneTransaction(req.query.id);
      clientError("Not Found", !one_res, 404);
      return res.json(one_res);
    }
    case "PUT": {
      // * Body from client ================== >
      const body = req.body as Pick<
        Transaction_face,
        "amount" | "reason" | "type"
      >;
      // * Zod Validation ==================== >
      const { amount, reason, type } = transactionSchema.parse(body);
      const edit_res = await editOneTransaction(req.query.id, {
        // from client --- >
        amount,
        reason,
        type,
        // TODO -> id must be authrized 
        user: "68a709aa701fc361de471a30", // * Relation <<<
        // api side --- >
        accountBalance: "3000",
      });
      return res.json(edit_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

import { transactionServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { isValidObjectId } from "mongoose";
import  { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { removeTransaction } = transactionServices;

  switch (req.method as "DELETE") {
    case "DELETE": {
      if (!isValidObjectId(req.query.id)) {
        throw new ApiError(400, "id is invalid (requires ObjectId)");
      }
      const delte_result = await removeTransaction(req.query.id);
      return res.status(204).json(null);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

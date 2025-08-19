import { transactionServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { Transaction_face } from "@/types/transaction.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { createTransaction, removeTransaction } = transactionServices;
  // * Body from client ================= >
  const body = req.body as Pick<Transaction_face, "amount" | "reason" | "type">;
  // * Zod validator ========================= >
  const { amount, reason } = transactionSchema.parse(body);

  switch (req.method as "POST" | "DELETE") {
    case "POST": {
      const create_res = await createTransaction({
        // from client ---- >
        type: body?.type, // no zod validation
        amount,
        reason,
        // api side - >
        accountBalance: "40000",
        createdAt: new Date().getUTCFullYear(),
      });
      return res.json(create_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

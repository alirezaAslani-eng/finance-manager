import { transactionServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { transactionSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { Transaction_face } from "@/types/transaction.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { createTransaction, getTransactions } = transactionServices;

  switch (req.method as "POST" | "GET") {
    case "POST": {
      // * Body from client ================= >
      const body = req.body as Pick<
        Transaction_face,
        "amount" | "reason" | "type"
      >;
      // * Zod validator ========================= >
      const { amount, reason, type } = transactionSchema.parse(body);
      const create_res = await createTransaction({
        // from client ---- >
        type,
        amount,
        reason,
        // api side - >
        accountBalance: "40000",
        createdAt: new Date().getUTCFullYear(),
      });
      return res.json(create_res);
    }
    case "GET": {
      const get_res = await getTransactions();
      return res.json(get_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

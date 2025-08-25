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
      // TODO -> auth : is it user at all
      // TODO -> auth :create a transaction document which is for that user by geting user's id
      // * Body from client ================= >
      const body = req.body;
      // * Zod validator ========================= >
      const { amount, reason, type, account, category } =
        transactionSchema.parse(body);
      const create_res = await createTransaction({
        // from client ---- >
        type,
        amount,
        reason,
        account,
        category,
        // TODO -> id must be authrized
        user: "68a709aa701fc361de471a30", // * Relation <<<
        // api side - >
        accountBalance: 40000,
      });
      return res.json(create_res);
    }
    case "GET": {
      // TODO -> auth : is it user at all
      // TODO -> auth : get all transactions document which are for that user by geting user's _id 
      const get_res = await getTransactions();
      return res.json(get_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

import { accountServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services ================== >
  const { createAccount } = accountServices;
  switch (req.method as "POST") {
    // TODO -> auth step 1: is it user at all
    // TODO -> auth step 2 : get field "_id" of user who wants to create a document
    case "POST": {
      // * Zod Validation ============== >
      const { cardNumber, currentBalance, accountName } = accountSchema.parse(
        req.body
      );
      // * Create Account ========== >
      const create_res = await createAccount({
        cardNumber,
        currentBalance,
        accountName,
        // TODO -> creator's id
        user: "68a709aa701fc361de471a30",
      });
      return res.json(create_res);
    }
    // TODO -> API : it will GET user's accounts by virtual method 
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};
("njbjkbmjn");
export default apiHandler(handler);

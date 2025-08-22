import { accountServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
const handler: handler_type = async (req, res) => {
  // * Services ================== >
  const { createAccount, getAccounts } = accountServices;
  switch (req.method as "POST" | "GET") {
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
        // TODO -> id must be authorized
        user: "68a709aa701fc361de471a30",
      });
      return res.json(create_res);
    }
    case "GET": {
      // TODO -> here we need to know who is getinig their accounts by authorizing theme
      const user_accounts = await getAccounts();
      return res.json(user_accounts);
    }
  }
};
("njbjkbmjn");
export default apiHandler(handler);

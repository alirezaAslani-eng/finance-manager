import { accountServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services ================== >
  const { createAccount } = accountServices;
  // * Payload Info ============================================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "لطفا اول وارد حساب شوید",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<

  switch (req.method as "POST") {
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
        user: payloadInfo._id,
      }); // ! Might Throw Error ================== <

      return res.json(create_res);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};
("njbjkbmjn");
export default apiHandler(handler);

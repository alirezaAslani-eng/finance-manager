import { accountServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";

const handler: handler_type = async (req, res) => {
  // * Services ================== >
  const { createAccount, IdentyfyAccount } = accountServices;
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
      // * Identyfy Account ======= >
      const bankInfo = IdentyfyAccount(cardNumber)!;

      throwError(!bankInfo, {
        message: "شماره کارت نامعتبر هست",
        statusCode: 400,
        type: "client",
      }); // ! Might Thow Code =========== <

      // * Create Account ========== >
      const create_res = await createAccount({
        cardNumber,
        currentBalance,
        accountName,
        user: payloadInfo._id,
        bankIcon: bankInfo.bank_logo,
        bankName: bankInfo.bank_name,
      }); // ! Might Throw Error ================== <

      return res.json(create_res);
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
("njbjkbmjn");
export default apiHandler(handler);

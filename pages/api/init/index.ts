import { setupUser } from "@/server/services";
import { apiHandler, verifyUserToken, throwError } from "@/server/utils";
import { setupUserSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { identyfyBank } from "@/lib/utils";

const handler: handler_type = async (req, res) => {
  const method = req.method as "POST";
  throwError(method != "POST", {
    message: "invalid method",
    statusCode: 405,
    type: "dev",
  }); // ! MIght Throw Erro =========== <

  // * Auth User ========================= >
  const payloadInfo = verifyUserToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "لطفا اول ثبت نام کنید",
    statusCode: 401,
    type: "client",
  }); // ! MIght Throw Erro =========== <
  // * if no error read user's payload
  const { _id: userID } = payloadInfo;

  // * Body from Client ==================== >
  const initInfo = setupUserSchema().parse(req.body);

  const banckInfo = identyfyBank(initInfo.cardNumber)!;
  throwError(!banckInfo, {
    message: "شماره کارت نامعتبر",
    statusCode: 400,
    type: "client",
  }); // ! Might Throw Error ======= <
  const { bank_logo, bank_title } = banckInfo;

  // * add an category and an account ============= >
  await setupUser({
    ...initInfo,
    userID,
    bankIcon: bank_logo,
    bankName: bank_title,
  });

  // * Success Response ================= >
  return res.status(204).json("");
};

export default apiHandler(handler);

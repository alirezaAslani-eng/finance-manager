import {
  accountServices,
  categoryServivces,
  initServices,
} from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { initSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { identyfyBank } from "@/utils";

const handler: handler_type = async (req, res) => {
  const method = req.method as "POST";
  throwError(method != "POST", {
    message: "invalid method",
    statusCode: 405,
    type: "dev",
  }); // ! MIght Throw Erro =========== <

  // * Auth User ========================= >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "لطفا اول ثبت نام کنید",
    statusCode: 401,
    type: "client",
  }); // ! MIght Throw Erro =========== <
  // * if no error read user's payload
  const { _id: userID } = payloadInfo;

  // * Body from Client ==================== >
  const initInfo = initSchema.parse(req.body);

  const banckInfo = identyfyBank(initInfo.cardNumber)!;
  throwError(!banckInfo, {
    message: "شماره کارت نامعتبر",
    statusCode: 400,
    type: "client",
  }); // ! Might Throw Error ======= <
  const { bank_logo, bank_title } = banckInfo;

  // * Account & Category Services ===================== >
  const { initializeUser } = initServices;

  // * add an category and an account ============= >
  await initializeUser({
    ...initInfo,
    userID,
    bankIcon: bank_logo,
    bankName: bank_title,
  });

  // * Success Response ================= >
  return res.status(204).json("");
};

export default apiHandler(handler);

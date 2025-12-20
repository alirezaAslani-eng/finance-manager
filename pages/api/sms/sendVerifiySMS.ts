import { requestAuthOTP } from "@/server/services";
import { apiHandler, verifyUserToken, throwError } from "@/server/utils";
import { sendCodeSchema } from "@/lib/validations/otpSchema";
import { handler_type } from "@/types/api.types";
import { OtpGoodResponse_face } from "@/types/opt.types";
const handler: handler_type = async (req, res) => {
  const islogin = verifyUserToken(req.cookies.token);
  throwError(!!islogin, {
    message: "شما قبلا وارد شدید",
    statusCode: 403,
    type: "client",
  }); // ! Might Throw Error ====================== <

  throwError(req.method != "POST", {
    message: "Request method is not allowed",
    statusCode: 405,
    type: "dev",
  }); // ! Might Throw Error ====================== <

  // * Validation Body ========================= >
  const { phone, type } = sendCodeSchema.parse(req.body); // ! Might throw Error ========== <

  // * Send otp record ============================ >
  const limitWait = await requestAuthOTP({ phone, type }); // ! Might throw Error ========== <

  // * Response ===================== >
  const response: OtpGoodResponse_face = {
    message: `کد به شماره ${phone} ارسال شد`,
    phone: phone,
    limitWait: limitWait,
  };
  return res.json(response);
};

export default apiHandler(handler);

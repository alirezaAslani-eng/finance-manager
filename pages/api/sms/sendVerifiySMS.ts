import { otpServices } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { sendCodeSchema } from "@/lib/validations/otpSchema";
import { handler_type } from "@/types/api.types";
import { OtpGoodResponse_face } from "@/types/opt.types";
const handler: handler_type = async (req, res) => {
  const islogin = payloadToken(req.cookies.token);
  throwError(!!islogin, {
    message: "شما قبلا وارد شدید",
    statusCode: 403,
    type: "client",
  }); // ! Might Throw Error ====================== <

  throwError(req.method != "POST", {
    message: "Request method is not allowed",
    statusCode: 405,
    type: "dev",
  });// ! Might Throw Error ====================== <

  // * Services ======================== >
  const { requestOtp } = otpServices;

  // * Validation Body ========================= >
  const { phone } = sendCodeSchema.parse(req.body); // ! Might throw Error ========== <

  // * Send otp record ============================ >
  const limitWait = await requestOtp({ phone }); // ! Might throw Error ========== <

  // * Response ===================== >
  const response: OtpGoodResponse_face = {
    message: `کد به شماره ${phone} ارسال شد`,
    phone: phone,
    limitWait: limitWait - new Date().getTime(),
  };
  return res.json(response);
};

export default apiHandler(handler);

import { otpServices } from "@/lib/services";
import {
  apiHandler,
  generateToken,
  payloadToken,
  throwError,
  tokenToCookie,
} from "@/server/utils";
import { verifySchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
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
  }); // ! Might Throw Error ====================== <
  // * Services ==================== >
  const { verifyOtp } = otpServices;
  // * Body From Client ===================== >
  const { phone, otpCode } = verifySchema.parse(req.body); // ! Might Throw Error ====================== <
  // * Verify User =================================== >
  const userInfo = await verifyOtp(phone, otpCode, { type: "signin" }); // ! Might Throw Error ====================== <
  // * Generate Token ================================ >
  const { email, fullName, _id, role } = userInfo;
  const token = generateToken({ _id, email, fullName, phone, role });
  // * Response =============== >
  return res.setHeader("Set-Cookie", tokenToCookie(token)).json("");
};

export default apiHandler(handler);

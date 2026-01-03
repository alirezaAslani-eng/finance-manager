import { verifyAuthOTP } from "@/server/services";
import {
  apiHandler,
  signUserToken,
  verifyUserToken,
  throwError,
  userTokenToCookie,
} from "@/server/utils";
import { verifyPhoneSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
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
  // * Body From Client ===================== >
  const { phone, otpCode } = verifyPhoneSchema().parse(req.body); // ! Might Throw Error ====================== <
  // * Verify User =================================== >
  const userInfo = await verifyAuthOTP({ otpCode, phone, type: "signin" }); // ! Might Throw Error ====================== <
  // * Generate Token ================================ >
  const { email, fullName, _id, role } = userInfo;
  const token = signUserToken({ _id, email, fullName, phone, role });
  // * Response =============== >
  return res.setHeader("Set-Cookie", userTokenToCookie(token)).json("");
};

export default apiHandler(handler);

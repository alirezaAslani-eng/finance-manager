import { isUniqueUser } from "@/server/services";
import { apiHandler, verifyUserToken, throwError } from "@/server/utils";
import { checkSignupInfoSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
const handler: handler_type = async (req, res) => {
  const isLogin = verifyUserToken(req.cookies.token);
  throwError(!!isLogin, {
    message: "شما قبلا وارد شدید",
    statusCode: 403,
    type: "client",
  }); // ! Might Throw Error <-------------------

  switch (req.method as "POST") {
    case "POST": {
      // * Server Validation ================== >
      const { userName, phone, email } = checkSignupInfoSchema().parse(
        req.body
      ); // ! Might Throw Error <--------------

      // * Check if user existed alredy ======================= >
      const isuniqueUser = await isUniqueUser({ phone, userName, email });
      throwError(!isuniqueUser, {
        message: "نام کاربری, شماره موبایل یا ایمیل قبلا ثبت شده",
        statusCode: 409,
        type: "client",
      }); // ! Might Throw Error ====================== <

      // * Response =================== >
      return res.json("");
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

export default apiHandler(handler);

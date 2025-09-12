import { userServices } from "@/lib/services";
import {
  apiHandler,
  generateToken,
  payloadToken,
  throwError,
  tokenToCookie,
} from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
const handler: handler_type = async (req, res) => {
  const isLogin = payloadToken(req.cookies.token);
  throwError(!!isLogin, {
    message: "شما قبلا وارد شدید",
    statusCode: 403,
    type: "client",
  }); // ! Might Throw Error <-------------------

  // * Services =============== >()
  const { registerUser, isUserExist, isFirstUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Validation Body ================== >
      const { userName, fullName, password, phone, email } = userSchema.parse(
        req.body
      ); // ! Might Throw Error <--------------

      // * Check if user existed alredy ======================= >
      const isExistedUser = await isUserExist({ phone, userName, email });
      throwError(isExistedUser, {
        message: "نام کاربری, شماره موبایل یا ایمیل قبلا ثبت شده",
        statusCode: 409,
        type: "client",
      }); // ! Might Throw Error ====================== <

      // * Check if it's first time, if true it's ADMIN ====================== >
      const isAdmin = await isFirstUser();

      // * Create Query Start =================== >
      const create_res = await registerUser({
        userName,
        fullName,
        password,
        phone,
        email,
        role: isAdmin ? "ADMIN" : "USER",
      });

      // * Generate New Token ===================== >
      const token = generateToken({
        fullName,
        phone,
        role: isAdmin ? "ADMIN" : "USER",
        email,
        _id: create_res._id,
      });

      // * Response =================== >
      return (
        res
          .status(201)
          // * Set Cookie ========== >
          .setHeader("Set-Cookie", tokenToCookie(token))
          .json(create_res)
      );
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

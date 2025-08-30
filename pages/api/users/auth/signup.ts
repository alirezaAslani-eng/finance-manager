import { userServices } from "@/lib/services";
import {
  apiHandler,
  clientError,
  generateToken,
  hashPass,
  tokenToCookie,
} from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { registerUser, isUserExist, isFirstUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Validation Body ================== >
      const { userName, fullName, password, phone, email } = userSchema.parse(
        req.body
      ); // ! Might Throw Error <--------------

      // * Check if user existed alredy ======================= >
      const isExistedUser = await isUserExist({ phone, userName ,email });
      clientError("نام کاربری, شماره موبایل یا ایمیل قبلا ثبت شده", isExistedUser, 409); // ! Might Throw Error <----------

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
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

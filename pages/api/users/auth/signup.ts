import { userServices } from "@/lib/services";
import { apiHandler, clientError, generateToken, hashPass } from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { ApiError } from "next/dist/server/api-utils";
import { serialize } from "cookie";
const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { registerUser, isUserExist, isFirstUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Validation Body ================== >
      const { userName, fullName, password, phone } = userSchema.parse(
        req.body
      ); // ! Might Throw Error <--------------

      // * Check if user existed alredy ======================= >
      const isExistedUser = await isUserExist({ phone, userName });
      clientError("نام کاربری یا شماره تماس قبلا ثبت شده", isExistedUser, 409); // ! Might Throw Error <----------

      // * Hash User Password =========================== >
      const hashedPassword = await hashPass(password);

      // * Check if it's first time, if true it's ADMIN ====================== >
      const isAdmin = await isFirstUser();

      // * Create Query Start =================== >
      const create_res = await registerUser({
        userName,
        fullName,
        password: hashedPassword,
        phone,
        role: isAdmin ? "ADMIN" : "USER",
      });

      // * Generate New Token ===================== >
      const token = generateToken({
        fullName,
        phone,
        role: isAdmin ? "ADMIN" : "USER",
      });

      // * Response =================== >
      return (
        res
          .status(201)
          // * Set Cookie ========== >
          .setHeader(
            "Set-Cookie",
            serialize("token", token, {
              httpOnly: true,
              path: "/",
              sameSite: "strict",
              secure: true,
              maxAge: 60 * 60 * 24 * 7, // * 1 week
            })
          )
          .json(create_res)
      );
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

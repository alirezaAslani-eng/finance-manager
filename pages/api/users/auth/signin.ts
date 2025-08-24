import { userServices } from "@/lib/services";
import { apiHandler, generateToken, tokenToCookie } from "@/lib/utils";
import { loginSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * Services ================= >
  const { loginUser } = userServices;
  switch (req.method as "GET") {
    case "GET": {
      // * Validation User's Data from Client ================= >
      const { password, identifier } = loginSchema.parse(req.body); // ! Might Throw Error <---------
      // * Verifiy User it will return info of user or an error ============== >
      const findedUser = await loginUser({ password, identifier }); // ! Might Throw Error <---------
      // * Generate Token =================== >
      const { fullName, phone, role, email } = findedUser;
      const token = generateToken({
        fullName,
        phone,
        role,
        email,
      });
      res // * Response < --------------
        .setHeader("Set-Cookie", tokenToCookie(token))
        .json(findedUser);
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

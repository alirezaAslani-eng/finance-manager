import { apiHandler, throwError } from "@/server/utils";
import { signupSchema } from "@/lib/validations";
import { user_model } from "@/server/models";
import { handler_type } from "@/types/api.types";

const handler: handler_type = async (req, res) => {
  throwError(req.method != "POST", {
    message: "Request method is not allowed",
    statusCode: 405,
    type: "dev",
  }); // ! Might Throw Error ==================== <
  const { phone } = signupSchema().pick({ phone: true }).parse(req.body);

  // * finding a user by their phone ========================== >
  const findedUser = await user_model.findOne({ phone });
  throwError(!findedUser, {
    message: "کاربری با این شماره موبایل وجود تدارد",
    statusCode: 404,
    type: "client",
  }); // ! Might Throw Error ==================== <

  return res.json(true);
};

export default apiHandler(handler);

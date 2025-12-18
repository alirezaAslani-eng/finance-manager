import { accountServices } from "@/lib/services";
import {
  apiHandler,
  checkExist,
  verifyUserToken,
  throwError,
} from "@/server/utils";
import { activeAccountSchema } from "@/lib/validations";
import { account_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";

const handler: handler_type = async (req, res) => {
  const token = req.cookies.token;
  const payloadInfo = verifyUserToken(token) as PayloadToken_type;

  switch (req.method as "PUT") {
    case "PUT": {
      const { changeActiveAccount, hasAccount } = accountServices;
      // * Get account's id from client =============== >
      const { _id } = activeAccountSchema.parse(req.body);

      // * Check if id isvalid ============== >
      throwError(!isValidObjectId(_id), {
        message: "_id is invalid as an ObjectID",
        statusCode: 400,
        type: "dev",
      }); // ! Might Throw Error ==================== <
      await checkExist(account_model, { _id }, "این حساب وجود ندارد"); // ! Might Throw Error ==================== <

      // * Chek if user have at least one account ==================== >
      const _hasAccount = await hasAccount(payloadInfo._id);
      throwError(!_hasAccount, {
        message: "لطفا اول یک کارت بانکی ایجاد کنید",
        statusCode: 403,
        type: "client",
      }); // ! Might Throw Error ==================== <

      // * then active it =================== >
      await changeActiveAccount(payloadInfo._id, _id);

      //   * Response =============== >
      res.status(204).json(true);
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

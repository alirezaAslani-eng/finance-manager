import { editUserInfo } from "@/server/services";
import {
  apiHandler,
  verifyUserToken,
  throwError,
  userTokenToCookie,
} from "@/server/utils";
import { editUserSchema } from "@/lib/validations/userSchema";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";

const handler: handler_type = async (req, res) => {
  // * Authorizing User ======================= >
  const payloadInfo = verifyUserToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "لطفا اول وارد شوید",
    statusCode: 401,
    type: "client",
  }); // ! Might throw Error ============= <

  // * Body from Client ===============>
  const newInfo = editUserSchema.parse(req.body); // ! Might Throw Error ================ <

  // * Edit Query ===================== >
  const updatedToken = await editUserInfo(payloadInfo._id, newInfo); // ! Might Throw Error ================ <

  // * Response ========================= >
  return res
    .setHeader("Set-Cookie", userTokenToCookie(updatedToken))
    .status(204)
    .json("");
};
export default apiHandler(handler);

import { userServices } from "@/lib/services";
import { apiHandler, throwError } from "@/lib/utils";
import { handler_type } from "@/types/api.types";

const handler: handler_type = async (req, res) => {
  throwError(req.method != "GET", {
    message: "request method is invalid",
    statusCode: 405,
    type: "dev",
  }); // ! Might Throw Error ====================== <

  // * Service ================ >
  const { getUserInfo } = userServices;

  // * Cookie & Token =============== >
  const { token } = req.cookies;

  // * Get Info of User Base on Token ============= >
  const userInfo = await getUserInfo(token);
  throwError(!userInfo, {
    message: "لطفا اول ثبت نام کنید",
    statusCode: 401,
    type: "client",
  }); // ! Might Throw Error ====================== <

  return res.json(userInfo); // * Response ---------- <<<<<<
};

export default apiHandler(handler);

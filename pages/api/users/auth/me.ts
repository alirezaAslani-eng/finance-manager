import { userServices } from "@/lib/services";
import { apiHandler, clientError } from "@/lib/utils";
import { handler_type } from "@/types/api.types";

const handler: handler_type = async (req, res) => {
  clientError("request method is invalid", req.method != "GET"); // ! Might Throw Error

  
  // * Service ================ >
  const { getUserInfo } = userServices;


  // * Cookie & Token =============== >
  const { token } = req.cookies;


  // * Get Info of User Base on Token ============= >
  const userInfo = await getUserInfo(token);
  clientError("لطفا اول ثبت نام کنید", !userInfo); // ! Might Throw Error

  return res.json(userInfo); // * Response ---------- <<<<<<
};

export default apiHandler(handler);

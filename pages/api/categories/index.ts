import { categoryServivces } from "@/lib/services";
import { apiHandler, payloadToken, throwError } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Services =============================== >
  const { createCategory } = categoryServivces;
  // * UserInfo =========================== >
  const payloadInfo = payloadToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "لطفا اول وارد شوید",
    statusCode: 401,
    type: "client",
  }); // ! Might Trow Error ==================== <

  switch (req.method as "POST") {
    case "POST": {
      const { name } = categorySchema.parse(req.body); // ! Might Throw Error ========================= <
      const create_res = await createCategory({ name, user: payloadInfo._id }); // ! Might Throw Error ========================= <
      return res.status(201).json(create_res); // ? RESPONSE <------------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

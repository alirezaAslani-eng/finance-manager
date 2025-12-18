import { apiHandler, throwError } from "@/server/utils";
import { handler_type } from "@/types/api.types";
import { serialize } from "cookie";
const handler: handler_type = async (req, res) => {
  throwError(req.method != "GET", {
    message: "request method is invalid",
    statusCode: 405,
    type: "dev",
  }); // ! Might Throw Error ====================== <
  res
    .setHeader(
      "Set-Cookie",
      serialize("token", "", {
        path: "/",
        maxAge: 0,
      })
    )
    .json("");
};

export default apiHandler(handler);

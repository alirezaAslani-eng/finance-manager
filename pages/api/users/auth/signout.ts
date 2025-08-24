import { apiHandler, clientError } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { serialize } from "cookie";
const handler: handler_type = async (req, res) => {
  clientError("request method is invalid", req.method != "GET"); // ! Might Throw Error
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

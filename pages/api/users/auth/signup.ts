import { userServices } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Services =============== >
  const { registerUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Validation Body ================== >
      const { userName, fullName, password, phone } = userSchema.parse(
        req.body
      ); // ! Might Throw Error <--------------
      // * Create Query Start =================== >
      const create_res = await registerUser({
        userName,
        fullName,
        password,
        phone,
      });
      return res.status(201).json(create_res); // ? RESPONSE <--------------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

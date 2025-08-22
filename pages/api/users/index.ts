import { apiHandler } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { userServices } from "@/lib/services";
import { userSchema } from "@/lib/validations";
import { ApiError } from "next/dist/server/api-utils";
const handler: handler_type = async (req, res) => {
  // * User Services  ================== >
  const { registerUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Zod Validation ==================== >
      const safe_user_info = userSchema.parse(req.body);// ! Might Throw Error
      // * Create User =============== >
      const reg_res = await registerUser(safe_user_info); 
      return res.json(reg_res); // * Response <<<
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

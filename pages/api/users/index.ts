import { apiHandler } from "@/lib/utils";
import { handler_type } from "@/types/api.types";
import { userServices } from "@/lib/services";
import { userSchema } from "@/lib/validations";
const handler: handler_type = async (req, res) => {
  // * User Services  ================== >
  const { registerUser } = userServices;
  switch (req.method as "POST") {
    case "POST": {
      // * Zod Validation ==================== >
      const safe_user_info = userSchema.parse(req.body);
      // * Create User =============== >
      const reg_res = await registerUser(safe_user_info); // ! Might Throw Error
      return res.json(reg_res); // * Response <<<
    }
  }
};

export default apiHandler(handler);

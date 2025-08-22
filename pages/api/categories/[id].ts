import { categoryServivces } from "@/lib/services";
import { apiHandler, clientError } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Check Params (id) ============= >
  clientError("id is not valid", !isValidObjectId(req.query.id)); // ! Might Throw Error
  // * Services  ======================== >
  const { removeCategory } = categoryServivces;

  switch (req.method as "DELETE") {
    case "DELETE": {
      // TODO -> auth : who is deleting a category are they authorized user at all
      const remove_res = await removeCategory(req.query.id); // ! Might Throw Error
      clientError(`there is no id with ${req.query.id}`, !remove_res); // ! Might Throw Error
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

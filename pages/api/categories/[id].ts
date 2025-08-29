import { categoryServivces } from "@/lib/services";
import { apiHandler, checkOwnerOf, clientError } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import { category_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Check Params (id) ============= >
  clientError("id is not valid", !isValidObjectId(req.query.id)); // ! Might Throw Error ================ <
  // * Services  ======================== >
  const { removeCategory, editOneCategory } = categoryServivces;
  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = (await checkOwnerOf({
    modelID: req.query.id as string,
    mustBeOwnerOf: category_model,
    req,
  })) as PayloadToken_type; // ! Might Throw Error ====================== <

  switch (req.method as "DELETE" | "PUT") {
    case "DELETE": {
      const remove_res = await removeCategory(req.query.id);
      return res.status(204).json(""); // ? RESPONSE <----------
    }
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    // TODO -> API : PUT updtate a category is needed 
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

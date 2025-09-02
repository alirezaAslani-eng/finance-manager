import { categoryServivces } from "@/lib/services";
import { apiHandler, checkOwnerOf, throwError } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import { category_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = (await checkOwnerOf({
    modelID: req.query.id as string,
    mustBeOwnerOf: category_model,
    req,
  })) as PayloadToken_type; // ! Might Throw Error ====================== <

  // * Check Params (id) ============= >
    throwError(!isValidObjectId(req.query.id), {
      message: "id is not valid",
      statusCode: 400,
      type: "dev",
    }); // ! Might throw Error <<<<<<<<
  // * Services  ======================== >
  const { removeCategory, editOneCategory } = categoryServivces;

  switch (req.method as "DELETE" | "PUT") {
    case "DELETE": {
      await removeCategory(req.query.id);
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    case "PUT": {
      const info = categorySchema.parse(req.body);
      await editOneCategory(req.query.id as string, {
        ...info,
        user: payloadInfo._id,
      });
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

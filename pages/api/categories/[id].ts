import { removeCategory, editCategory } from "@/server/services";
import {
  apiHandler,
  checkOwnerOf,
  verifyUserToken,
  throwError,
} from "@/server/utils";
import { categoryEditSchema } from "@/lib/validations";
import { category_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";

const handler: handler_type = async (req, res) => {
  // * Check Params (id) ============= >
  throwError(!isValidObjectId(req.query.id), {
    message: "id is not valid",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<
  // * Check is it a user and is it owner of this document ====================== >
  const payloadInfo = verifyUserToken(req.cookies.token) as PayloadToken_type;
  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  });
  await checkOwnerOf({
    userId: payloadInfo._id,
    modelID: req.query.id as string,
    mustBeOwnerOf: category_model,
  }); // ! Might Throw Error ====================== <

  switch (req.method as "DELETE" | "PUT") {
    case "DELETE": {
      await removeCategory(req.query.id as string);
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    case "PUT": {
      const { name } = categoryEditSchema.parse(req.body);
      await editCategory(req.query.id as string, {
        name,
        user: payloadInfo._id,
      });
      return res.status(204).json(""); // ? RESPONSE <----------
    }
    default: {
      throwError(true, {
        message: "request method is not allowed",
        statusCode: 405,
        type: "dev",
      });
    }
  }
};

export default apiHandler(handler);

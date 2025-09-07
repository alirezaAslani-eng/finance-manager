import { accountServices } from "@/lib/services";
import { apiHandler, checkOwnerOf, throwError } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { account_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { PayloadToken_type } from "@/types/user.types";
import { isValidObjectId } from "mongoose";

const handler: handler_type = async (req, res) => {
  const payloadInfo = (await checkOwnerOf({
    modelID: req.query.id as string,
    mustBeOwnerOf: account_model,
    req,
  })) as PayloadToken_type; // ! Might Throw Error
  // * Check params (id) ============= >
  throwError(!isValidObjectId(req.query.id), {
    message: "id is not valid",
    statusCode: 400,
    type: "dev",
  }); // ! Might throw Error <<<<<<<<
  // * Services ================== >
  const { removeAccount, editAccount, getOneAccount } = accountServices;
  switch (req.method as "DELETE" | "PUT" | "GET") {
    case "DELETE": {
      await removeAccount(req.query.id); // ! Might throw Error <<<<<<<<
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "PUT": {
      // * Body to Update Account ============== >
      const { accountName, cardNumber, currentBalance } = accountSchema.parse(
        req.body
      );
      // * Start Updating Account ============== >
      await editAccount(req.query.id, {
        accountName,
        cardNumber,
        currentBalance,
        user: payloadInfo._id,
      }); // ! Might throw Error <<<<<<<<
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "GET": {
      const get_res = await getOneAccount(req.query.id); // ! Might throw Error <<<<<<<<
      return res.json(get_res); // ? RESPONSE <<<-------
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

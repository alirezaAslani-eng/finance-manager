import { accountServices } from "@/lib/services";
import { apiHandler, checkOwnerOf, clientError } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { account_model } from "@/model";
import { handler_type } from "@/types/api.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  // * Check params (id) ============= >
  clientError("id is not valid", !isValidObjectId(req.query.id)); // ! Might throw Error <<<<<<<<
  // * Services ================== >
  const { removeAccount, editAccount, getOneAccount } = accountServices;
  switch (req.method as "DELETE" | "PUT" | "GET") {
    case "DELETE": {
      await checkOwnerOf({
        modelID: req.query.id as string,
        mustBeOwnerOf: account_model,
        req,
      }); // ! Might Throw Error
      const remove_res = await removeAccount(req.query.id);
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "PUT": {
      await checkOwnerOf({
        modelID: req.query.id as string,
        mustBeOwnerOf: account_model,
        req,
      }); // ! Might Throw Error
      // * Body to Update Account ============== >
      const { accountName, cardNumber, currentBalance } = accountSchema.parse(
        req.body
      );
      // * Start Updating Account ============== >
      const update_res = await editAccount(req.query.id, {
        accountName,
        cardNumber,
        currentBalance,
        user: "68a709aa701fc361de471a30", // TODO -> auth : owner's id
      });
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "GET": {
      await checkOwnerOf({
        modelID: req.query.id as string,
        mustBeOwnerOf: account_model,
        req,
      }); // ! Might Throw Error

      const get_res = await getOneAccount(req.query.id);

      return res.json(get_res); // ? RESPONSE <<<-------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

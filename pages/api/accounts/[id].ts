import { accountServices } from "@/lib/services";
import { apiHandler, clientError } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
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
      // TODO -> auth step 1: is it user at all 
      // TODO -> auth step 2 : user must be the owner of the document -> (the field "user" of account document must be the same as the field "_id" of user)
      const remove_res = await removeAccount(req.query.id);
      // * Check if dose the (id) exist ================= >
      clientError(
        `there is no document with this id : ${req.query.id}`, // ! Might throw Error <<<<<<<<
        !remove_res
      );
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "PUT": {
      // TODO -> auth step 1 : is it user at all 
      // TODO -> auth step 2 : user must be the owner of the document -> (the field "user" of account document must be the same as the field "_id" of user)
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
      // * Check if dose the (id) exist ============= >
      clientError(
        `there is no document with this id : ${req.query.id}`, // ! Might throw Error <<<<<<<<
        !update_res
      );
      return res.status(204).json(""); // ? RESPONSE <<<-------
    }
    case "GET": {
      // TODO -> auth step 1 : who wants to see a details of an account (is it user at all) 
      // TODO -> auth step 2 : user must be the owner of the document -> (the field "user" of account document must be the same as the field "_id" of user)
  
      const get_res = await getOneAccount(req.query.id);
      // * Check if dose the (id) exist ============= >
      clientError(
        `there is no document with this id : ${req.query.id}`, // ! Might throw Error <<<<<<<<
        !get_res
      );
      return res.json(get_res); // ? RESPONSE <<<-------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);

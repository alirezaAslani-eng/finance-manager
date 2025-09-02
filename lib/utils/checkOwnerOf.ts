import payloadToken from "./payloadToken";
import { throwError } from ".";
// * Types ===================== >
import type { Model } from "mongoose";
import type { PayloadToken_type } from "@/types/user.types";
import { NextApiRequest } from "next";

interface Props {
  mustBeOwnerOf: Model<any>;
  req: NextApiRequest;
  modelID: string;
}

const checkOwnerOf = async ({
  mustBeOwnerOf,
  modelID,
  req,
}: Props): Promise<void | PayloadToken_type> => {
  // * User Token =================================== >
  const token = req.cookies.token;

  // * Get Payload ========================== >
  const payloadInfo = payloadToken(token) as PayloadToken_type;

  throwError(!payloadInfo, {
    message: "اول وارد حساب شوید",
    statusCode: 401,
    type: "client",
  });

  const { _id: userId } = payloadInfo;

  // * Does it exist ==================== >
  const document_exist = await mustBeOwnerOf.findOne({
    _id: modelID,
  });

  throwError(!document_exist, {
    message: "Not Found",
    statusCode: 404,
    type: "client",
  });

  // * Check if user is owner of Document ========================= >
  // document's user prop has to contain the same (id) as (payload._id) it means user must be its owner!
  throwError(document_exist.user != userId, {
    message: "dosen't access",
    statusCode: 403,
    type: "client",
  });

  return payloadInfo;
};

export default checkOwnerOf;

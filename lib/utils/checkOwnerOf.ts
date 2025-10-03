import payloadToken from "./payloadToken";
import { throwError } from ".";
// * Types ===================== >
import type { Model } from "mongoose";
import type { PayloadToken_type } from "@/types/user.types";
import { NextApiRequest } from "next";

interface Props {
  mustBeOwnerOf: Model<any>;
  userId: string;
  modelID: string;
}

const checkOwnerOf = async ({
  mustBeOwnerOf,
  modelID,
  userId,
}: Props): Promise<void | PayloadToken_type> => {
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
};

export default checkOwnerOf;


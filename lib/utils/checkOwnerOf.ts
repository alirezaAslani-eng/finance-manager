import payloadToken from "./payloadToken";
import { clientError } from ".";
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
  clientError("اول وارد حساب شوید", !payloadInfo, 401); // ! Might Throw Error ====================== <<
  const { _id: userId } = payloadInfo;

  // * Dose it exist ==================== >
  const document_exist = await mustBeOwnerOf.findOne({
    _id: modelID,
  });
  clientError("Not Found", !document_exist, 404); // ! Might Throw Error ====================== <<
  // * Check is user owner of Document ========================= >
  // document's user prop has to contain the same (id) as (payload._id) it means user must be it's owner !
  clientError("dosen't access", document_exist.user != userId, 403); // ! Might Throw Error ====================== <<

  return payloadInfo;
};

export default checkOwnerOf;

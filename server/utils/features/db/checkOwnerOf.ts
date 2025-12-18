import { throwError } from "@/server/utils";
import { parseDoc } from "@/lib/utils";
// * Types ===================== >
import type { Model } from "mongoose";

interface Props {
  mustBeOwnerOf: Model<any>;
  userId: string;
  modelID: string;
}

interface Options {
  autoError?: boolean;
}

function checkOwnerOf(
  requiredProps: Props,
  opt?: { autoError?: true }
): Promise<void>;

function checkOwnerOf(
  requiredProps: Props,
  opt?: { autoError?: false }
): Promise<boolean>;

async function checkOwnerOf(
  { mustBeOwnerOf, modelID, userId }: Props,
  opt: Options = {}
): Promise<void | boolean> {
  const { autoError = true } = opt;

  // * Does it exist ==================== >
  const document_exist = await mustBeOwnerOf.findOne({
    _id: modelID,
  });

  // * Check if user is owner off Document ========================= >
  const isOwner = parseDoc(document_exist)?.user == String(userId);

  if (autoError) {
    throwError(!document_exist, {
      message: "Not Found",
      statusCode: 404,
      type: "client",
    }); // ! Error Not Found =============== <
  }
  if (autoError) {
    throwError(!isOwner, {
      message: "dosen't access",
      statusCode: 403,
      type: "client",
    }); // ! Error user Dos not Access ================ <
  }

  // * When the auto error is false ============= >

  return isOwner;
}

export default checkOwnerOf;

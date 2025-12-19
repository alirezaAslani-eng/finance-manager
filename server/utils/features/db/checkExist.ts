import { isValidObjectId } from "mongoose";
import { throwError } from "@/server/utils";
import {
  FalseAutoErrorOverloadProps,
  TrueAutoErrorOverloadProps,
  Options,
} from "./types";

function checkExist<TDoc = any>(opt: TrueAutoErrorOverloadProps): Promise<TDoc>;

function checkExist<TDoc = any>(
  opt: FalseAutoErrorOverloadProps
): Promise<null | TDoc>;

async function checkExist<TDoc = any>({
  _id,
  model,
  autoError,
  errorText = "document not found",
  session,
}: Options): Promise<TDoc | null> {
  // * check format of _id
  const isValidId = isValidObjectId(_id);
  throwError(!!(autoError && !isValidId), {
    message: "id is invalid",
    statusCode: 400,
    type: "dev",
  });
  if (!autoError && !isValidId) return null;

  const findedDoc = await model.findOne({ _id }, undefined, {
    session,
  });

  // * Auto error --> return TDoc || Throw Error
  throwError(!!(autoError && !!!findedDoc), {
    message: errorText,
    statusCode: 404,
    type: "client",
  }); // ! Throw Error ==================== <
  if (autoError) return findedDoc as TDoc;

  // * Auto error --> return TDoc || null
  return findedDoc as TDoc | null;
}

export default checkExist;

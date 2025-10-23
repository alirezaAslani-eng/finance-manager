import type { Model, RootFilterQuery, ClientSession } from "mongoose";
import throwError from "./throwError";

interface Options {
  session?: ClientSession;
}
const checkExist = async <T>(
  model: Model<any>,
  findOneInput: RootFilterQuery<any>,
  errorText: string = "can't find document (Not Found)",
  options: Options = {}
): Promise<T> => {
  const findedDoc = await model.findOne(findOneInput, undefined, {
    session: options?.session,
  });
  throwError(!findedDoc, {
    message: errorText,
    statusCode: 404,
    type: "client",
  }); // ! Migth Throw Error ==================== <
  return findedDoc;
};

export default checkExist;

import type { Model, RootFilterQuery, Document } from "mongoose";
import throwError from "./throwError";

const checkExist = async <T>(
  model: Model<any>,
  findOneInput: RootFilterQuery<any>,
  errorText: string = "can't find document (Not Found)"
): Promise<T> => {
  const findedDoc = await model.findOne(findOneInput);
  throwError(!findedDoc, {
    message: errorText,
    statusCode: 404,
    type: "client",
  }); // ! Migth Throw Error ==================== <
  return findedDoc;
};

export default checkExist;

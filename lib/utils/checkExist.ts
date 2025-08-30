import type { Model, RootFilterQuery, Document } from "mongoose";
import { clientError } from ".";

const checkExist = async <T>(
  model: Model<any>,
  findOneInput: RootFilterQuery<any>,
  errorText: string = "can't find document (Not Found)"
): Promise<T> => {
  const findedDoc = await model.findOne(findOneInput);
  clientError(errorText, !findedDoc); // ! Migth Throw Error ==================== <
  return findedDoc;
};

export default checkExist;

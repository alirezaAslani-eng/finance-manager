import { isValidObjectId, type Model } from "mongoose";
import throwError from "./throwError";

// * Input Types ================== >
interface InputType {
  _id: string | undefined;
  model: Model<any>;
}
interface Options {
  autoErro?: true | false;
}
// * Overload ============== >
async function check_id(
  requireInput: InputType,
  options?: { autoErro?: false }
): Promise<boolean>;
async function check_id(
  requireInput: InputType,
  options?: { autoErro?: true }
): Promise<void>;

// * Function ===================== >
async function check_id(
  { _id, model }: InputType,
  options: Options = {}
): Promise<void | boolean> {
  const { autoErro } = options;

  // * Check _id ==================== >
  const isValid_id = isValidObjectId(_id);

  // * Throw Error or retuen false ================= >
  if (autoErro) {
    throwError(!isValid_id, {
      message: "id نامعتبر",
      statusCode: 404,
      type: "client",
    }); // ! Error === <
  } else {
    if (!isValid_id) return false;
  }
  // * Check Existing =============== >
  const isExisted = await model.findOne({ _id });


  // * Throw Error or retuen false ================= >
  if (autoErro) {
    throwError(!isExisted, {
      message: "id نامعتبر",
      statusCode: 404,
      type: "client",
    }); // ! Error === <
  } else {
    if (!isExisted) return false;
    return true;
  }
}

export default check_id;

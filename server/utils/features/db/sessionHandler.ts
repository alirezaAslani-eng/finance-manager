import { BadResponse, throwError } from "@/server/utils";
import type { ClientSession } from "mongoose";
type ScopeType = () => Promise<any> | void;
interface HandlerProps {
  _try: ScopeType;
  _catch?: ScopeType;
  _finally?: ScopeType;
}

async function sessionHandler<SuccessType = unknown>(
  session: ClientSession,
  { _try, _catch = () => {}, _finally = () => {} }: HandlerProps
): Promise<SuccessType | void> {
  try {
    const res = await _try();
    return res as SuccessType;
  } catch (err) {
    await session.abortTransaction(); // * SESSION HAS PROBLEM
    await _catch(); // ! Might Throw Error (Less use) <<<<<<<<<<<
    if (err instanceof BadResponse) {
      throwError(true, err); // ! Throw Badresponse Error <<<<<<<<<<<
    }
    if (err) {
      throwError(true, {
        type: "database",
        message: "Data Base Error",
        statusCode: 500,
        devMessage: err,
      }); // ! Throw Unexpected Error <<<<<<<<<<<
    }
  } finally {
    await session.endSession(); // * SESSION END
    await _finally();
  }
}

export default sessionHandler;

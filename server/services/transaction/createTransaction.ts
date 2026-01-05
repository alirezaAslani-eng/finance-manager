import { conect } from "@/server/db";
import { category_model, transaction_model } from "@/server/models";
import {
  applyTransactionEffectOnBalance,
  checkExist,
  sessionHandler,
} from "@/server/utils";
import { CreateTransaction, CreateTransaction_Output } from "./types";

const createTransaction: CreateTransaction = async (body) => {
  const con = await conect();
  // * Start Session ============= >
  const session = await con.startSession();
  session.startTransaction();
  const create_result = await sessionHandler(session, {
    _try: async () => {
      await checkExist({
        _id: body.category,
        model: category_model,
        autoError: true,
        session,
      }); // ! Might Throw Error ====================== <

      const amount = await applyTransactionEffectOnBalance(body, session); // ! Might Throw Error ====================== <

      // * Find Latest Transaction and false it ===== >
      await transaction_model.findOneAndUpdate(
        {
          user: body.user,
          account: body.account,
          isLatest: true,
        },
        { isLatest: false },
        { session }
      );
      // * Create Latest Transaction ============================================== >
      const [created] = await transaction_model.create(
        [
          {
            ...body,
            accountBalance: amount,
            isLatest: true,
          },
        ],
        { session }
      );
      // * Successfull result =============== >
      await session.commitTransaction();
      return created;
    },
  });
  return create_result as CreateTransaction_Output;
};

export default createTransaction;

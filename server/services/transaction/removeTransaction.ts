import { conect } from "@/server/db";
import { sessionHandler, throwError } from "@/server/utils";
import { changeCurrentBalance } from "@/server/services";
import { transaction_model } from "@/model";

const removeTransaction = async (_id: string): Promise<void> => {
  const con = await conect();
  const session = await con.startSession();
  session.startTransaction();
  await sessionHandler(session, {
    _try: async () => {
      // * Find Transaction ============= >
      const transaction = await transaction_model.findOne({ _id }, undefined, {
        session,
      });

      // * Check if it's latest transaction ========== >>>>
      throwError(!transaction.isLatest, {
        message: "فقط آخرین تراکنش مجاز به حذف هست",
        statusCode: 403,
        type: "client",
      }); // ! Might Throw Error <<<<<<<<

      // * Update balance =================== >
      await changeCurrentBalance(
        transaction.account,
        transaction.type == "0" ? transaction.amount : -transaction.amount,
        session
      );

      // * Remove Transaction ============ >
      await transaction_model.findOneAndDelete({ _id }, { session });

      // * Update Latest Tranasction ============ >
      await transaction_model.findOneAndUpdate(
        { account: transaction.account },
        { $set: { isLatest: true } },
        { session, sort: { createdAt: -1 } }
      );

      // * Finish =============== >
      await session.commitTransaction();
    },
  });
};

export default removeTransaction;

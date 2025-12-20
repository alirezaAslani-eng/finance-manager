import { conect } from "@/server/db";
import { EditLatestTransaction } from "./types";
import { transaction_model } from "@/model";
import { toSerializable } from "@/lib/utils";
import { getChangedKeys } from "@/utils";
import {
  applyTransactionEffectOnBalance,
  removeTransactionEffectOnBalance,
  sessionHandler,
} from "@/server/utils";

const editLatestTransaction: EditLatestTransaction = async (_id, body) => {
  const con = await conect();

  // * Get Old transaction ================ >
  const oldTransaction = await transaction_model.findOne({ _id });
  const serializableOldTransaction = toSerializable(oldTransaction);

  // * Get Fields user Changed =============== >
  const changedFields = getChangedKeys(serializableOldTransaction, body);
  if (!changedFields || !Object.keys(changedFields)?.length) return; // * when user changed nothing <<

  if (changedFields?.amount || changedFields?.type) {
    const session = await con.startSession();
    session.startTransaction();
    // * Edit Session ============= >
    await sessionHandler(session, {
      _try: async () => {
        // * Cut Relation between olDtransaction and account =================== >
        await removeTransactionEffectOnBalance(
          {
            accountId: serializableOldTransaction.account as string,
            amount: serializableOldTransaction.amount,
            type: serializableOldTransaction.type,
          },
          session
        );
        // * Merg changed updated fields and old fields ================ >
        const updatedInfo = { ...serializableOldTransaction, ...body };

        // * Add New Relation and apply changes on account ======== >
        const accountBalance = await applyTransactionEffectOnBalance(
          updatedInfo,
          session
        ); // ! Might Throw Error <<<<<

        // * Update Transaction ================ >
        await transaction_model.findOneAndUpdate(
          { _id },
          { $set: { ...changedFields, accountBalance } },
          { session }
        ); // * Commit Session ================ >
        await session.commitTransaction();
      },
    });
  } else {
    // * If user just changed reason or category ============ >
    await transaction_model.findOneAndUpdate({ _id }, { $set: changedFields });
  }
};

export default editLatestTransaction;

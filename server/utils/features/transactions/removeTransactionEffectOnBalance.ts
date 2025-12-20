import { account_model } from "@/model";
import { RemoveTransactionEffectOnBalance } from "./types";

/**
 * This Method removes the Effect of a transaction on an account
 */
const removeTransactionEffectOnBalance: RemoveTransactionEffectOnBalance =
  async function ({ accountId, amount, type }, session) {
    if (type == "0") {
      // * If user spend : return it back
      await account_model.findOneAndUpdate(
        { _id: accountId },
        { $inc: { currentBalance: amount } },
        { session }
      );
    } else if (type == "1") {
      // * If user get income : decrease balance
      await account_model.findOneAndUpdate(
        { _id: accountId },
        { $inc: { currentBalance: -amount } },
        { session }
      );
    }
  };

export default removeTransactionEffectOnBalance;

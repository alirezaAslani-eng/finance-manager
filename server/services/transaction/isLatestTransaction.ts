import { transaction_model } from "@/model";
import { IsLatestTransaction } from "./types";

const isLatestTransaction: IsLatestTransaction = async (
  _id,
  session
): Promise<boolean> => {
  const transaction = await transaction_model.findOne(
    {
      _id,
      isLatest: true,
    },
    undefined,
    { session }
  );
  return !!transaction;
};

export default isLatestTransaction;

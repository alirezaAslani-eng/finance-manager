import { account_model } from "@/server/models";
import { ClientSession } from "mongoose";

const changeCurrentBalance = async (
  accountID: string,
  incOrDecNumber: number,
  session?: ClientSession
) => {
  await account_model.findOneAndUpdate(
    { _id: accountID },
    // * increase or decrease ================= >
    {
      $inc: {
        currentBalance: incOrDecNumber,
      },
    },
    { session }
  );
};

export default changeCurrentBalance;

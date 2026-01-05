import { conect } from "@/server/db";
import { ActiveAccount } from "./types";
import { account_model } from "@/server/models";

const activeAccount: ActiveAccount = async (userID, accountID) => {
  await conect();
  //  * Find previous Actived Account and unActive it === >
  await account_model
    .findOneAndUpdate(
      {
        user: userID,
        isActive: true,
      },
      { isActive: false }
    )
    .lean();

  // * Active requested account === >
  await account_model.findOneAndUpdate(
    {
      _id: accountID,
      user: userID,
    },
    { isActive: true }
  );
};

export default activeAccount;

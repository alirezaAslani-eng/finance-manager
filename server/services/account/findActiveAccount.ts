import { conect } from "@/server/db";
import { FindActiveAccount, FindActiveAccountOutput } from "./types";
import { account_model } from "@/model";
import { toSerializable } from "@/lib/utils";

const findActiveAccount: FindActiveAccount = async (userID) => {
  await conect();
  const findedAccount = await account_model
    .findOne(
      {
        user: userID,
        isActive: true,
      },
      undefined,
      { select: "user _id" }
    )
    .lean<FindActiveAccountOutput>();

  return toSerializable<FindActiveAccountOutput>(findedAccount);
};

export default findActiveAccount;

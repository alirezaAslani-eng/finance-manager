import { conect } from "@/server/db";
import { GetUserInfo } from "./types";
import { verifyUserToken } from "@/server/utils";
import { user_model } from "@/model";
import { GetMeOutput } from "@/types/user.types";

const getUserInfo: GetUserInfo = async (token) => {
  await conect();
  // * Verify Token ================ >
  const payloadInfo = verifyUserToken(token);
  if (!payloadInfo) return false;

  // * find User Info ================= >
  const finded_user = await user_model
    .findOne(
      {
        $and: [{ email: payloadInfo.email }],
      },
      undefined,
      { select: "-password -createdAt -updatedAt -__v" }
    )
    .populate("categories")
    .populate("accounts")
    .lean<GetMeOutput>();

  // * Payload of Token is valid but user is deleted =================== >
  if (!finded_user) return false;
  return finded_user;
};

export default getUserInfo;

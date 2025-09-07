import { InferSchemaType } from "mongoose";
import { conect } from "../db";
import { user_model, user_schema } from "@/model";
import { throwError, hashPass, payloadToken, verifyPass } from "../utils";
import { GetMeOutput, userDoc_type } from "@/types/user.types";

// * User schema type ======== >
type UserType = InferSchemaType<typeof user_schema>;

const userServices = {
  async registerUser(userInfo: UserType) {
    await conect();
    // * Hash User Password =========================== >
    const hashedPassword = await hashPass(userInfo.password);
    // * Save User In Database ========================= >
    const reg_res = await user_model.create({
      ...userInfo,
      password: hashedPassword,
    });
    const withOutPassword = reg_res.toObject();
    // * Delete Password Field in result ==================== >
    delete withOutPassword.password;
    return withOutPassword;
  },
  async getUserInfo(token: string | undefined): Promise<GetMeOutput | false> {
    await conect();
    // * Verify Token ================ >
    const payloadInfo = payloadToken(token);
    if (!payloadInfo) return false;

    // * find User Info ================= >
    const finded_user: unknown = await user_model
      .findOne(
        {
          $and: [{ email: payloadInfo.email }],
        },
        undefined,
        { select: "-password" }
      )
      .populate("categories")
      .populate("accounts")
      .lean();

    // * Payload of Token is valid but user is deleted =================== >
    if (!finded_user) return false;
    return finded_user as GetMeOutput;
  },

  async isUserExist({
    userName,
    phone,
    email,
  }: Pick<UserType, "userName" | "phone" | "email">): Promise<boolean> {
    await conect();
    const isExist = await user_model.findOne({
      $or: [{ userName }, { phone }, { email }],
    });
    return isExist;
  },

  async isFirstUser(): Promise<boolean> {
    await conect();
    const userLength = await user_model.find();
    return !userLength.length;
  },
};

export default userServices;

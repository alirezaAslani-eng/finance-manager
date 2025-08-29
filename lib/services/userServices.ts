import { InferSchemaType } from "mongoose";
import { conect } from "../db";
import { user_model, user_schema } from "@/model";
import { clientError, hashPass, payloadToken, verifyPass } from "../utils";
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
  async loginUser({
    password,
    identifier,
  }: Pick<UserType, "password"> & { identifier: string }): Promise<
    Omit<UserType & userDoc_type, "password">
  > {
    await conect();
    // * Finding User by their email or userName ============ >
    const findedUser = await user_model.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });
    clientError("متسفانه کاربری با این مشخصات وجود ندارد", !findedUser, 404); // ! Might Throw Error
    const user = findedUser.toObject();
    // * Checck Password ================= >
    const isPasswordCorect = await verifyPass(password, user.password);
    clientError("رمز یا نام کاربری اشتباه هست", !isPasswordCorect, 422); // ! Might Throw Error
    // * Delete Password Field And Return User Info ====== >
    delete user.password;
    return user;
  },
  async getUserInfo(token: string | undefined): Promise<GetMeOutput | false> {
    await conect();
    // * Verify Token ================ >
    const payloadInfo = payloadToken(token);
    if (!payloadInfo) return false;
    // * find User Info ================= >
    const finded_user: unknown = await user_model.findOne(
      {
        $and: [{ email: payloadInfo.email }],
      },
      undefined,
      { select: "-password" }
    );
    // * Payload of Token is valid but user is deleted =================== >
    if (!finded_user) return false;
    return finded_user as GetMeOutput;
  },
  async isUserExist({
    userName,
    phone,
  }: Pick<UserType, "userName" | "phone">): Promise<boolean> {
    await conect();
    const isExist = await user_model.findOne({
      $or: [{ userName }, { phone }],
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

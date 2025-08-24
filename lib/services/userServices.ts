import { InferSchemaType } from "mongoose";
import { conect } from "../db";
import { user_model, user_schema } from "@/model";
import { clientError, verifyPass } from "../utils";
// * User schema type ======== >
type UserType = InferSchemaType<typeof user_schema>;
const userServices = {
  async registerUser(userInfo: UserType) {
    await conect();
    const reg_res = await user_model.create(userInfo);
    const withOutPassword = reg_res.toObject();
    delete withOutPassword.password;
    return withOutPassword;
  },
  async loginUser({
    password,
    identifier,
  }: Pick<UserType, "password"> & { identifier: string }): Promise<
    Omit<UserType, "password">
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
  async getMe() {
    await conect();
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

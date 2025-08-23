import { InferSchemaType } from "mongoose";
import { conect } from "../db";
import { user_model, user_schema } from "@/model";
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
  async loginUser() {
    await conect();
  },
  async getMe() {
    await conect();
  },
};

export default userServices;

import { User_face } from "@/types/user.types";
import { conect } from "../db";
import { user_model } from "@/model";
import { userRule } from "../validations/rules";

const userServices = {
  async registerUser(userInfo: typeof userRule) {
    await conect();
    const reg_res = await user_model.create(userInfo);
    return reg_res;
  },
  async loginUser() {
    await conect();
  },
  async getMe() {
    await conect();
  },
};

export default userServices;

import { User_face } from "@/types/user.types";
import { conect } from "../db";
import { user_model } from "@/model";

const userServices = {
  async registerUser(userInfo: User_face) {
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

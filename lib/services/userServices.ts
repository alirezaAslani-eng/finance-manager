import { conect } from "../db";

const userServices = {
  async registerUser() {
    await conect();
  },
  async loginUser() {
    await conect();
  },
  async getMe() {
    await conect();
  },
};

export default userServices;

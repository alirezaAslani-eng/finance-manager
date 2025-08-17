import { conect } from "../db";

const accountServices = {
  async createAccount() {
    await conect();
  },
  async removeAccount() {
    await conect();
  },
  async editAccount() {
    await conect();
  },
  async getAccounts() {
    await conect();
  },
};

export default accountServices;
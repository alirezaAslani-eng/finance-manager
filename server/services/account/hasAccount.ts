import { account_model } from "@/model";

const hasAccount = async (userID: string) => {
  const userHasAccount = await account_model.findOne({ user: userID });
  return !!userHasAccount;
};

export default hasAccount;

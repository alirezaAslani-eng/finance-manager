import { conect } from "@/server/db";
import { user_model } from "@/server/models";

const isFirstUser = async (): Promise<boolean> => {
  await conect();
  const userLength = await user_model.find().limit(1);
  return !userLength.length;
};

export default isFirstUser;

import { conect } from "@/server/db";
import { user_model } from "@/model";
import { IsUniqueUser } from "./types";

const isUniqueUser: IsUniqueUser = async ({ email, phone, userName }) => {
  await conect();
  const isExist = await user_model.findOne({
    $or: [{ userName }, { phone }, { email }],
  });
  return !!!isExist;
};

export default isUniqueUser;

import { conect } from "@/server/db";
import { RegisterUser, RegisterUser_Output } from "./types";
import { verifyAuthOTP } from "@/server/services";
import { hashPass } from "@/server/utils";
import { user_model } from "@/model";

const registerUser: RegisterUser = async (userInfo) => {
  const { phone, otpCode } = userInfo;
  await conect();

  // * Verify user phone ======================== >
  await verifyAuthOTP({ phone, otpCode, type: "signup" }); // ! Might Throw Error ================ <

  // * Hash User Password =========================== >
  const hashedPassword = await hashPass(userInfo.password);

  // * Save User In Database ========================= >
  const reg_res = await user_model.create({
    ...userInfo,
    password: hashedPassword,
  });

  const withOutPassword = reg_res?.toObject();
  // * Delete Password Field in result ==================== >
  delete withOutPassword.password;
  return withOutPassword as RegisterUser_Output;
};

export default registerUser;

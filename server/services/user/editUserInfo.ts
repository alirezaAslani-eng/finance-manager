import { signUserToken, throwError } from "@/server/utils";
import { EditUserInfo } from "./types";
import { conect } from "@/server/db";
import { user_model } from "@/server/models";
import { isUniqueUser } from "@/server/services";

const editUserInfo: EditUserInfo = async (userID, newInfo) => {
  await conect();
  const { email, phone, userName } = newInfo;
  // * Check if new info is unique ============================ >
  const isUnique = await isUniqueUser({ phone, email, userName });
  throwError(isUnique, {
    message: "نام کاربری, شماره موبایل یا ایمیل که وارد میکنید قبلا ثبت شده",
    statusCode: 409,
    type: "client",
  }); // ! Might Throw Error ================== <

  // * Edit Query ========================= >
  const updatedInfo = await user_model.findOneAndUpdate(
    { _id: userID },
    { $set: { ...newInfo } },
    { new: true }
  );

  // * needed fields to update Token =========================== >
  const {
    _id, // ! cant be updated at all
    email: updatedEmail,
    fullName: updatedFullName,
    role, // ! cant be updated by user
    phone: updatedPhone,
  } = updatedInfo;

  const UpdatedToken = signUserToken({
    _id,
    role,
    email: updatedEmail,
    fullName: updatedFullName,
    phone: updatedPhone,
  });
  return UpdatedToken;
};

export default editUserInfo;

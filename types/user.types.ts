import { Account_face } from "./account.types";
import { Category_face } from "./category.types";

enum UserRolesEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
interface User_face {
  userName: string;
  fullName: string;
  password: string;
  email: string;
  phone: string;
  role?: keyof typeof UserRolesEnum; // * "USER" | "ADMIN"
}
type userDoc_type = { _id: string };
type PayloadToken_type = {
  [key in keyof Pick<
    User_face,
    "fullName" | "phone" | "role" | "email"
  >]: User_face[key];
} & userDoc_type;
type GetMeOutput = Pick<
  User_face,
  "email" | "fullName" | "phone" | "role" | "userName"
> & {
  _id: string;
  accounts: ({ _id: string } & Pick<
    Account_face,
    "accountName" | "cardNumber" | "currentBalance" | "isActive"
  >)[];
  categories: ({ _id: string } & Pick<Category_face, "name">)[];
};

type SignupResponse_type = Omit<User_face, "password">;
// * Type ====>
export type {
  User_face,
  PayloadToken_type,
  GetMeOutput,
  userDoc_type,
  SignupResponse_type,
};
// * Value ===== >
export { UserRolesEnum };

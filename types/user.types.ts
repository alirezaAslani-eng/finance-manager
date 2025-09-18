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
>;

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

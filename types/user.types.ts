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
type PayloadToken_type = {
  [key in keyof Pick<
    User_face,
    "fullName" | "phone" | "role" | "email"
  >]: User_face[key];
};
type GetMeOutput = Pick<
  User_face,
  "email" | "fullName" | "phone" | "role" | "userName"
>;
// * Type ====>
export type { User_face, PayloadToken_type, GetMeOutput };
// * Value ===== >
export { UserRolesEnum };

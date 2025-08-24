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
  [key in keyof Pick<User_face, "fullName" | "phone" | "role">]: User_face[key];
};
// * Type ====>
export type { User_face, PayloadToken_type };
// * Value ===== >
export { UserRolesEnum };

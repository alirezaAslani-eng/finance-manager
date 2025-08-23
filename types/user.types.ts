enum UserRolesEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
interface User_face {
  userName: string;
  fullName: string;
  password: string;
  phone: string;
  role?: keyof typeof UserRolesEnum; // * "USER" | "ADMIN"
}
// * Type ====>
export type { User_face };
// * Value ===== >
export { UserRolesEnum };

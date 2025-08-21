import { User_face } from "./user.types";

interface Account_face {
  cardNumber: string;
  // TODO -> currentBalance must be number
  currentBalance: string;
  user:User_face
}
export type { Account_face };

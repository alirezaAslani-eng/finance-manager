import { User_face } from "./user.types";

interface Account_face {
  isActive: boolean;
  accountName: string;
  cardNumber: string;
  currentBalance: number;
  user: User_face;
}
export type { Account_face };

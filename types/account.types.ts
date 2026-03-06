import { User_face } from "./user.types";

interface Account_face {
  isActive: boolean;
  accountName: string;
  cardNumber: string;
  currentBalance: number;
  user: User_face;
  bankName: string;
  bankIcon: string;
}
interface Account {
  _id: string;
  accountName: string;
  cardNumber: string;
  currentBalance: number;
  isActive: boolean;
  user: string;
  bankName: string;
  bankIcon: string;
}
export type { Account_face, Account };

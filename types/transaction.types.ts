import { User_face } from "./user.types";

interface Transaction_face {
  type: "0" | "1"; // * 1 = income & 0 = Expense
  amount: string;
  accountBalance: string;
  reason: string;
  user: User_face;
}
export type { Transaction_face };

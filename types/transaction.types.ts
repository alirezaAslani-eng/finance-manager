import { User_face } from "./user.types";

interface Transaction_face {
  type: "0" | "1"; // * 1 = income & 0 = Expense
  // TODO -> amount must be number
  amount: string;
  // TODO -> accountBalance must be number
  accountBalance: string;
  reason: string;
  user: User_face;
}
export type { Transaction_face };

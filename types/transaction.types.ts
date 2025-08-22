import { Account_face } from "./account.types";
import { Category_face } from "./category.types";
import { User_face } from "./user.types";

interface Transaction_face {
  type: "0" | "1"; // * 1 = income & 0 = Expense
  amount: number;
  accountBalance: number;
  reason: string;
  user: User_face;
  account: Account_face;
  category:Category_face
}
export type { Transaction_face };

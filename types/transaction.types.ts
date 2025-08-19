interface Transaction_face {
  type: "0" | "1"; // * 1 = income & 0 = Expense
  amount: string;
  accountBalance: string;
  createdAt: Date;
  reason: string;
}
export type { Transaction_face };

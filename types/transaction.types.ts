interface Transaction_face {
  type: 0 | 1; // * 1 = income & 0 = Expense
  amount: number;
  accountBalance: number;
  createdAt: string;
  reason: string;
}
export type { Transaction_face };

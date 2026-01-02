interface Bank {
  card_no: number;
  bank_name: string;
  bank_title: string;
  bank_logo: string;
}
interface BankList {
  [key: `${number}`]: Bank;
}

export type { Bank, BankList };

import { banks } from "@/constant/features/account";
import { Bank } from "@/constant/features/account/types";

const identyfyBank = (card_number: string): Bank | undefined => {
  const BIN: `${number}` = card_number.slice(0, 6) as `${number}`;
  const bank_details: Bank | undefined = banks[BIN];
  return bank_details;
};

export default identyfyBank;

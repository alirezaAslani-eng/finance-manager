import { banks } from "@/constant";
import { Bank } from "@/constant/types/banks.types";

const identyfyBank = (card_number: string): Bank | undefined => {
  const BIN: `${number}` = card_number.slice(0, 6) as `${number}`;
  console.log(BIN);
  
  const bank_details: Bank | undefined = banks[BIN];
  return bank_details;
};

export default identyfyBank;

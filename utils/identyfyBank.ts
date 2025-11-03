import { banks } from "@/constant";
import { Bank } from "@/constant/types/banks.types";

const identyfyBank = (card_number: string): Bank | undefined => {
  const BIN: number = Number(card_number.slice(0, 6));
  const bank_details: Bank | undefined = banks.find((bank) => {
    return bank.card_no == BIN;
  });
  return bank_details;
};


export default identyfyBank
import { Bank } from "@/lib/constant";
import { cardNumberFormatter, identyfyBank } from "@/lib/utils";
import { useState } from "react";

interface OutPut {
  formattedCardNumber: string;
  bankIcon: Bank | null;
  cardNumberHandler: (cardNumber: string) => void;
}

type UseIdentyfyBank = () => OutPut;

const useIdentyfyBank: UseIdentyfyBank = () => {
  const [formattedCardNumber, setCardNumber] = useState("");
  const [bankIcon, setBanckIcon] = useState<Bank | null>(null);

  const cardNumberHandler: OutPut["cardNumberHandler"] = (value) => {
    const { formatted, onlyNumber } = cardNumberFormatter(value);

    // * dont update input if card number becomes full 16 digits  === >
    if (onlyNumber.length > 16) return;

    // * set value to internal state as separated (0000-0000) ==== >
    setCardNumber(formatted);

    // * Identyfy Bank ==== >
    const bankInfo = identyfyBank(onlyNumber);
    if (bankInfo) {
      setBanckIcon(bankInfo);
    } else {
      setBanckIcon(null);
    }
  };

  return { cardNumberHandler, formattedCardNumber, bankIcon };
};

export default useIdentyfyBank;

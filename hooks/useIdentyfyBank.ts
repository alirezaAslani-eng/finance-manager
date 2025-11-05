import { cardNumberFormatter, identyfyBank } from "@/utils";
import { TextFieldProps } from "@mui/material";
import React, { useState } from "react";

interface OutPut {
  formattedCardNumber: string;
  bankIcon: string | false;
  cardNumberHandler: (cardNumber: string) => void;
}

type UseIdentyfyBank = () => OutPut;

const useIdentyfyBank: UseIdentyfyBank = () => {
  const [formattedCardNumber, setCardNumber] = useState("");
  const [bankIcon, setBanckIcon] = useState<false | string>("");

  const cardNumberHandler: OutPut["cardNumberHandler"] = (value) => {
    const { formatted, onlyNumber } = cardNumberFormatter(value);

    // * dont update input if card number becomes full 16 digits  === >
    if (onlyNumber.length > 16) return;

    // * set value to internal state as separated (0000-0000) ==== >
    setCardNumber(formatted);

    // * Identyfy Bank ==== >
    const bankInfo = identyfyBank(onlyNumber);
    if (bankInfo) {
      // * Set Icon Address ===== >
      setBanckIcon(bankInfo.bank_logo);
    } else {
      // * Disable Icon Address ===== >
      setBanckIcon(false);
    }
  };

  return { cardNumberHandler, formattedCardNumber, bankIcon };
};

export default useIdentyfyBank;

import { account_model } from "@/model";
import { IsUniqueCardNumber } from "./types";

const isUniqueCardNumber: IsUniqueCardNumber = async (cardNumber) => {
  // * cardNumber Field must be Unique ============== >
  const isUnique = await account_model.findOne({
    cardNumber: cardNumber.trim(),
  });
  return !!!isUnique;
};

export default isUniqueCardNumber;

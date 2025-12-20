import {
  createAccount,
  createCategory,
  isUniqueCardNumber,
} from "@/server/services";
import { SetupUser } from "./types";
import { throwError } from "@/server/utils";

const setupUser: SetupUser = async (info) => {
  const {
    cardNumber,
    categoryName,
    currentBalance,
    userID,
    bankIcon,
    bankName,
    accountName,
  } = info;

  // * Account & Category Services ===================== >

  // * Must be Uniq ================ >
  const isUniqCard = await isUniqueCardNumber(cardNumber);
  throwError(!isUniqCard, {
    message: "شماره کارت نامعتر هست",
    statusCode: 400,
    type: "client",
  }); // ! Might Throw Error ============= <
  // * Run Query ================ >
  await createCategory({ name: categoryName, user: userID }); // ! Might Throw Error ============= <
  await createAccount(
    {
      accountName,
      cardNumber,
      currentBalance,
      user: userID,
      bankIcon,
      bankName,
    },
    { uniqCheck: false }
  ); // ! Might Throw Error ============= <
};

export default setupUser;

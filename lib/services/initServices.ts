import { InferSchemaType } from "mongoose";
import { conect } from "../db";
import { throwError } from "../utils";
import { InitSchemaType } from "../validations/initSchema";
import accountServices from "./accountServices";
import categoryServivces from "./categoryServivces";
import { account_schema } from "@/model";
type AccountModelType = InferSchemaType<typeof account_schema>;
const initServices = {
  async initializeUser(
    info: InitSchemaType & { userID: string } & Pick<
        AccountModelType,
        "bankName" | "bankIcon"
      >
  ): Promise<void> {
    const {
      accountName,
      cardNumber,
      categoryName,
      currentBalance,
      userID,
      bankIcon,
      bankName,
    } = info;

    // * Account & Category Services ===================== >
    const { createCategory } = categoryServivces;
    const { createAccount, isUniqueCardNumber } = accountServices;

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
  },
};

export default initServices;

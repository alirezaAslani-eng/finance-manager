import { AccountModelSchema } from "@/server/services";
import { ApplyTransactionEffectOnBalance } from "./types";
import { checkExist, throwError } from "@/server/utils";
import { account_model } from "@/model";

/**
 * it decreases or increases the current balance and return it
 */
const applyTransactionEffectOnBalance: ApplyTransactionEffectOnBalance =
  async function (body, session): Promise<number> {
    // * Check (account) it must be valid as _id and existed in colection =============== >
    const account = await checkExist<AccountModelSchema>({
      _id: body.account as string,
      autoError: true,
      model: account_model,
      session,
    }); // ! Might Throw Error =================== <

    // * accountBalance field gets value base on current account's balance ========================= >
    // * amount of transaction >>
    let amount = 0;
    // * type 0 = spend / type 1 = income ================= >
    if (body.type == "0") {
      throwError(account.currentBalance - body.amount < 0, {
        message:
          "مجودی حساب برای ثبت تراکنش کافی نمیباشد لطفا مجودی فعلی را افزایش دهید",
        statusCode: 400,
        type: "client",
      }); // ! Might Throw Error =================== <
      amount = account.currentBalance - body.amount; // * Decrease -
    } else if (body.type == "1") {
      amount = account.currentBalance + body.amount; // * Increase +
    }

    // * change the current balance of user's account ============================== >
    await account_model.findOneAndUpdate(
      { _id: body.account },
      {
        currentBalance: amount,
      } as Pick<AccountModelSchema, "currentBalance">,
      { session }
    );

    return amount;
  };

export default applyTransactionEffectOnBalance;

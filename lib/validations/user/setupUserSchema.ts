import { object } from "zod";
import createAccountSchema from "../account/createAccountSchema";
import createCategorySchema from "../category/createCategorySchema";

const setupUserSchema = () => {
  return object({
    accountName: createAccountSchema().shape.accountName,
    cardNumber: createAccountSchema().shape.cardNumber,
    currentBalance: createAccountSchema().shape.currentBalance,
    categoryName: createCategorySchema().shape.name,
  });
};

export default setupUserSchema;

import createTransactionSchema from "./createTransactionSchema";

const editTransactionSchema = () => {
  return createTransactionSchema().pick({
    category: true,
    reason: true,
    amount: true,
    type: true,
  });
};

export default editTransactionSchema;

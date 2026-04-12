import createAccountSchema from "./createAccountSchema";

function editAccountSchema() {
  return createAccountSchema().pick({ accountName: true, cardNumber: true });
}

export default editAccountSchema;

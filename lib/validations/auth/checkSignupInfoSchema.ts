import signupSchema from "./signupSchema";

const checkSignupInfoSchema = () => {
  return signupSchema().pick({ email: true, phone: true, userName: true });
};

export default checkSignupInfoSchema;

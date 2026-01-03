import signupSchema from "../auth/signupSchema";

const editUserSchema = () => {
  return signupSchema().pick({
    userName: true,
    fullName: true,
    phone: true,
    email: true,
  });
};

export default editUserSchema;

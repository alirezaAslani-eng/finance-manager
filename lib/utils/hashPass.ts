import { hash } from "bcryptjs";
const hashPass = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export default hashPass;

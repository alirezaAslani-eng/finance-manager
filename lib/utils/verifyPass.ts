import { compare } from "bcryptjs";

const verifyPass = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const verified = await compare(password, hashedPassword);
  return verified;
};

export default verifyPass

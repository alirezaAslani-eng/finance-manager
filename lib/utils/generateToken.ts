import { sign } from "jsonwebtoken";
const generateToken = <T extends object>(data: T): string => {
  // * Private Key =========== >
  const privateKey = process.env.privateKey as string;
  // * Start Generate Token =================== >
  const token = sign(data, privateKey, {
    expiresIn: Number(process.env.invalidateToken),
  });
  return token;
};

export default generateToken;

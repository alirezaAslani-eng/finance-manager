import { PayloadToken_type } from "@/types/user.types";
import { sign } from "jsonwebtoken";
const signUserToken = (data: PayloadToken_type): string => {
  // * Private Key =========== >
  const privateKey = process.env.privateKey as string;
  // * Start Generate Token =================== >
  const token = sign(data, privateKey, {
    expiresIn: Number(process.env.invalidateToken),
  });
  return token;
};

export default signUserToken;

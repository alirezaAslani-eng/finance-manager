import { PayloadToken_type } from "@/types/user.types";
import { verify } from "jsonwebtoken";
const payloadToken = (token: string | undefined) => {
  if (!token) return false;
  // * Private Key =================== >
  const privateKey = process.env.privateKey as string;
  // * Verifiy Token =============== >
  try {
    const payload = verify(token, privateKey);
    return payload as PayloadToken_type;
  } catch (err) {
    return false;
  }
};
export default payloadToken;

import { serialize } from "cookie";

const tokenToCookie = (token: string): string => {
  return serialize("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    maxAge: Number(process.env.invalidateToken), // * 1 week
  });
};

export default tokenToCookie;

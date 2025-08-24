import { serialize } from "cookie";

const tokenToCookie = (token: string): string => {
  return serialize("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // * 1 week
  });
};

export default tokenToCookie
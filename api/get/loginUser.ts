import { verifySchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse } from "@/lib/utils";
const loginUser = async (
  loginInfo: Infer<typeof verifySchema>
): Promise<BadResponse | string> => {
  const res = await fetch("/api/users/auth/signin", {
    method: "GET",
    body: JSON.stringify(loginInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes;
};

export default loginUser;

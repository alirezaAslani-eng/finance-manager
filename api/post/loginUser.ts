import { loginSchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse } from "@/lib/utils";
const loginUser = async (
  loginInfo: Infer<typeof loginSchema>
): Promise<BadResponse | string> => {
  const res = await fetch("/api/user/auth/signin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes;
};

export default loginUser;

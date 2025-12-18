import { verifySchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse_face } from "@/types/error.types";
const loginUser = async (
  loginInfo: Infer<typeof verifySchema>
): Promise<BadResponse_face | string> => {
  const res = await fetch("/api/users/auth/signin", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes;
};

export default loginUser;

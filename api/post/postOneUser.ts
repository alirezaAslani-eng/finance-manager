import { sendCodeSchema, userSchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse_face } from "@/types/error.types";
import { SignupResponse_type } from "@/types/user.types";

const postOneUser = async (
  userInfo: Infer<typeof userSchema>
): Promise<BadResponse_face | SignupResponse_type> => {
  const res = await fetch("/api/users/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes as SignupResponse_type;
};

export default postOneUser;

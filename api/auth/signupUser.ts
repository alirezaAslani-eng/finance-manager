import { SignupSchemaType } from "@/lib/validations/types";
import type { BadResponse_face } from "@/types/error.types";
import { SignupResponse_type } from "@/types/user.types";

const signupUser = async (
  userInfo: SignupSchemaType
): Promise<BadResponse_face | SignupResponse_type> => {
  const res = await fetch("/api/auth/signup", {
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

export default signupUser;

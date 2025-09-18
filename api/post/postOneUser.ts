import { sendCodeSchema, userSchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse } from "@/lib/utils";
import { SignupResponse_type } from "@/types/user.types";

const postOneUser = async (
  userInfo: Infer<typeof userSchema>
): Promise<BadResponse | SignupResponse_type> => {
  const res = await fetch("/api/users/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as SignupResponse_type;
};

export default postOneUser;

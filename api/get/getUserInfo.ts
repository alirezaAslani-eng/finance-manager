import type { GetMeOutput } from "@/types/user.types";
import type { BadResponse } from "@/lib/utils";

const getUserInfo = async (): Promise<GetMeOutput | BadResponse> => {
  const res = await fetch("/api/users/auth/me");
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as GetMeOutput;
};

export default getUserInfo;

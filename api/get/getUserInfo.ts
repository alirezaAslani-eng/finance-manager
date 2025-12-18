import type { GetMeOutput } from "@/types/user.types";
import type { BadResponse_face } from "@/types/error.types";


const getUserInfo = async (): Promise<GetMeOutput | BadResponse_face> => {
  const res = await fetch("/api/users/auth/me");
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes as GetMeOutput;
};

export default getUserInfo;

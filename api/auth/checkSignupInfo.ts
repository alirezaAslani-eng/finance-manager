import type { CheckSignupInfoSchemaType } from "@/lib/validations/types";
import type { BadResponse_face } from "@/types/error.types";
const checkSignupInfo = async (
  signupInfo: CheckSignupInfoSchemaType
): Promise<void> => {
  const res = await fetch("/api/auth/check-signup-info", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
};

export default checkSignupInfo;

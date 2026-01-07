import { SendAuthCodeSchemaType } from "@/lib/validations/types";
import type { BadResponse_face } from "@/types/error.types";
import type { OtpGoodResponse_face } from "@/types/opt.types";
const postVerifySMS = async (
  sendCodeInfo: SendAuthCodeSchemaType
): Promise<BadResponse_face | OtpGoodResponse_face> => {
  const res = await fetch("/api/auth/sendAuthVerifyCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendCodeInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes as OtpGoodResponse_face;
};

export default postVerifySMS;

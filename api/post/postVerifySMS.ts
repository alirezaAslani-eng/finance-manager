import { sendCodeSchema } from "@/lib/validations";
import type { Infer } from "zod";
import type { BadResponse } from "@/lib/utils";
import type { OtpGoodResponse_face } from "@/types/opt.types";
const postVerifySMS = async (
  sendCodeInfo: Infer<typeof sendCodeSchema>
): Promise<BadResponse | OtpGoodResponse_face> => {
  const res = await fetch("/api/sms/sendVerifiySMS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendCodeInfo),
  });

  const jsonRes = await res.json();

  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as OtpGoodResponse_face;
};

export default postVerifySMS;

import type { BadResponse_face } from "@/types/error.types";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";

const postInitInfo = async (
  transactionInfo: transactionSchemaType
): Promise<true | BadResponse_face> => {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes;
};

export default postInitInfo;

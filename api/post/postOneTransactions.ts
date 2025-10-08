import type { BadResponse } from "@/lib/utils";
import { transactionSchemaType } from "@/lib/validations/transactionSchema";

const postInitInfo = async (
  transactionInfo: transactionSchemaType
): Promise<true | BadResponse> => {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes;
};

export default postInitInfo;

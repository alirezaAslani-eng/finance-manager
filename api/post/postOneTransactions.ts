import type { BadResponse_face } from "@/types/error.types";
import { CreateTransactionSchemaType } from "@/lib/validations/types";

const postInitInfo = async (
  transactionInfo: CreateTransactionSchemaType
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

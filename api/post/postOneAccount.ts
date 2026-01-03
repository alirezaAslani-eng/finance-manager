import type { BadResponse_face } from "@/types/error.types";
import type { CreateAccountSchemaType } from "@/lib/validations/types";

const postOneAccount = async (
  accountInfo: CreateAccountSchemaType
): Promise<true | BadResponse_face> => {
  const res = await fetch("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes;
};

export default postOneAccount;

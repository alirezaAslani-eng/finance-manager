import type { BadResponse_face } from "@/types/error.types";
import { ActiveAccountSchemaType } from "@/lib/validations/types";

const putActiveAccount = async (
  infoToActive: ActiveAccountSchemaType
): Promise<true | BadResponse_face> => {
  const res = await fetch(`/api/accounts/active`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoToActive),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default putActiveAccount;

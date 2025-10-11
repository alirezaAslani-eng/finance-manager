import type { BadResponse } from "@/lib/utils";
import { ActiveAccountSchemaType } from "@/lib/validations/accountSchema";

const putActiveAccount = async (
  infoToActive: ActiveAccountSchemaType
): Promise<true | BadResponse> => {
  const res = await fetch(`/api/accounts/active`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoToActive),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse;
  }
  return true;
};

export default putActiveAccount;

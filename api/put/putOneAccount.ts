import type { BadResponse } from "@/lib/utils";
import { AccountSchemaType } from "@/lib/validations/accountSchema";

const putOneAccount = async (
  updatedInfo: AccountSchemaType & { _id: string }
): Promise<true | BadResponse> => {
  const res = await fetch(`/api/accounts/${updatedInfo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse;
  }
  return true;
};

export default putOneAccount;

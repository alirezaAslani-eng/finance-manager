import type { BadResponse } from "@/lib/utils";
import { accountSchema } from "@/lib/validations";
import { AccountSchemaType } from "@/lib/validations/accountSchema";

const postOneAccount = async (
  accountInfo: AccountSchemaType
): Promise<true | BadResponse> => {
  const res = await fetch("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes;
};

export default postOneAccount;

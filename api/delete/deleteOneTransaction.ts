import type { BadResponse } from "@/lib/utils";

const deleteOneTransaction = async (
  id: string
): Promise<true | BadResponse> => {
  const res = await fetch(`/api/transactions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse;
  }
  return true;
};

export default deleteOneTransaction;

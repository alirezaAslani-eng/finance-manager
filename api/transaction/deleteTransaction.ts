import type { BadResponse_face } from "@/types/error.types";

const deleteTransaction = async (
  id: string
): Promise<true | BadResponse_face> => {
  const res = await fetch(`/api/transactions/${id}/one`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default deleteTransaction;

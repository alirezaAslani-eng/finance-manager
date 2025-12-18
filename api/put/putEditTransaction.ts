import { BadResponse_face } from "@/types/error.types";
import { transactionEditSchemaType } from "@/lib/validations/transactionSchema";

const putEditTransaction = async (
  updatedInfo: transactionEditSchemaType & { _id: string }
): Promise<true | BadResponse_face> => {
  const res = await fetch(`/api/transactions/${updatedInfo._id}/one`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default putEditTransaction;

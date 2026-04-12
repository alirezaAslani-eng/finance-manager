import { EditAccountSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";

const editOneAccount = async (
  updatedInfo: EditAccountSchemaType & { _id: string }
): Promise<true | BadResponse_face> => {
  const res = await fetch(`/api/accounts/${updatedInfo._id}`, {
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

export default editOneAccount;

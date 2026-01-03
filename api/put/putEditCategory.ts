import type { BadResponse_face } from "@/types/error.types";
import { EditCategorySchemaType } from "@/lib/validations/types";

const putEditCategory = async (
  updatedInfo: EditCategorySchemaType & { _id: string }
): Promise<true | BadResponse_face> => {
  const res = await fetch(`/api/categories/${updatedInfo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: updatedInfo.name }),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default putEditCategory;

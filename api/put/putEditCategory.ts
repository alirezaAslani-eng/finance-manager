import { CreatedCategoryReturnService } from "@/lib/services/types/services.types";
import type { BadResponse } from "@/lib/utils";
import { CategorySchemaType } from "@/lib/validations/categorySchema";

const putEditCategory = async (
  updatedInfo: CategorySchemaType & { _id: string }
): Promise<CreatedCategoryReturnService | BadResponse> => {
  const res = await fetch(`/api/categories/${updatedInfo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as CreatedCategoryReturnService;
};

export default putEditCategory;

import { CreatedCategoryReturnService } from "@/lib/services/types/services.types";
import type { BadResponse } from "@/lib/utils";
import { CategorySchemaType } from "@/lib/validations/categorySchema";

const postOneCategory = async (
  categoryInfo: CategorySchemaType
): Promise<CreatedCategoryReturnService | BadResponse> => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse;
  }
  return jsonRes as CreatedCategoryReturnService;
};

export default postOneCategory;

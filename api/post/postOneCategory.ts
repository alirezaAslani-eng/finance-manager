import type { CreatedCategoryOutputService } from "@/server/services";
import type { BadResponse_face } from "@/types/error.types";
import { CreateCategorySchemaType } from "@/lib/validations/types";

const postOneCategory = async (
  categoryInfo: CreateCategorySchemaType
): Promise<CreatedCategoryOutputService | BadResponse_face> => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryInfo),
  });

  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return jsonRes as CreatedCategoryOutputService;
};

export default postOneCategory;

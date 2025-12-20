import { useMutation } from "@tanstack/react-query";
import { CategorySchemaType } from "@/lib/validations/categorySchema";
import { postOneCategory } from "@/api/post";
import { useCallback } from "react";
import type { CreatedCategoryOutputService } from "@/server/services";
import { useAuth } from "@/context";
import { BadResponse_face } from "@/types/error.types";
function useAddCategory() {
  const { mutateAsync } = useMutation({ mutationFn: postOneCategory });

  // * user info to update categories ================= >
  const { addCategory: add, userInfo } = useAuth();

  const addCategory = useCallback(async (categoryInfo: CategorySchemaType) => {
    try {
      const category = (await mutateAsync(
        categoryInfo
      )) as CreatedCategoryOutputService;

      // * update category info ============ >
      add(category);
    } catch (err) {
      const error = err as BadResponse_face;
      // todo show Error ========== >
      console.log(error);
    }
  }, []);

  return { addCategory };
}

export default useAddCategory;

import { useMutation } from "@tanstack/react-query";
import { CategorySchemaType } from "@/lib/validations/categorySchema";
import { postOneCategory } from "@/api/post";
import type { BadResponse } from "@/lib/utils";
import { useCallback, useContext } from "react";
import { CreatedCategoryReturnService } from "@/lib/services/types/services.types";
import { AuthContex } from "@/context";
function useAddCategory() {
  const { mutateAsync } = useMutation({ mutationFn: postOneCategory });

  // * user info to update categories ================= >
  const { addCategory: add, userInfo } = useContext(AuthContex)!;

  const addCategory = useCallback(async (categoryInfo: CategorySchemaType) => {
    try {
      const category = (await mutateAsync(
        categoryInfo
      )) as CreatedCategoryReturnService;

      // * update category info ============ >
      add(category);
    } catch (err) {
      const error = err as BadResponse;
      // todo show Error ========== >
      console.log(error);
    }
  }, []);

  return { addCategory };
}

export default useAddCategory;

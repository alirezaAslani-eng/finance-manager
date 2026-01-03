import { putEditCategory } from "@/api/put";
import { useAuth } from "@/context";
import { EditCategorySchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";

interface SubmitWithId {
  editCategory: (info: EditCategorySchemaType, __id: string) => Promise<void>;
}
interface InstancedWithID {
  editCategory: (info: EditCategorySchemaType) => Promise<void>;
  oldCategoryName: string;
}
type ReturnType = SubmitWithId | InstancedWithID;
function useEditCategory(_id: string): InstancedWithID;
function useEditCategory(): SubmitWithId;

function useEditCategory(_id?: string): ReturnType {
  const { mutateAsync } = useMutation({ mutationFn: putEditCategory });

  // * Auth Context to Edit Category in client =========== >
  const { editCategory: clientEdit } = useAuth();

  // * Auth Context to find old category ===== >
  const {
    userInfo: { categories },
  } = useAuth();
  // * Find old category's name if _id is taken from hook parameters === >
  const oldCategory = categories.find((cat) => {
    return cat._id == _id;
  });

  // * Submiter
  const editCategory = async (info: EditCategorySchemaType, __id?: string) => {
    try {
      // * Request to edit ======= >
      await mutateAsync({
        ...info,
        _id: __id || _id || "",
      });

      // * edit category in client to make rerender ============= >
      clientEdit({ _id: _id as string, newName: info.name });
      // todo show sucess alert ===== >
    } catch (err) {
      const error = err as BadResponse_face;
      // Todo Show Error to user ==== >

      console.log(error);
    }
  };

  return { editCategory, oldCategoryName: oldCategory?.name };
}

export default useEditCategory;

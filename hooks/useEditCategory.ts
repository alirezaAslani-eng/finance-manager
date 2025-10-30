import { putEditCategory } from "@/api/put";
import { AuthContex } from "@/context";
import { BadResponse } from "@/lib/utils";
import { CategoryEditSchemaType } from "@/lib/validations/categorySchema";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";


// * when we need to pass the _id to the hook
type SubmitNeedId = (
  info: CategoryEditSchemaType,
  __id: string
) => Promise<void>;
// * when we need to pass the _id each time when calling the submiter method
type SubmitNoId = (info: CategoryEditSchemaType) => Promise<void>;

function useEditCategory(_id: string): { editCategory: SubmitNoId };
function useEditCategory(): { editCategory: SubmitNeedId };

function useEditCategory(_id?: string) {
  const { mutateAsync } = useMutation({ mutationFn: putEditCategory });

  // * Auth Context to Edit Category in client =========== >
  const { editCategory: clientEdit } = useContext(AuthContex)!;

  // * Submiter
  const editCategory = async (info: CategoryEditSchemaType, __id?: string) => {
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
      const error = err as BadResponse;
      // Todo Show Error to user ==== >

      console.log(error);
    }
  };

  return { editCategory };
}

export default useEditCategory;

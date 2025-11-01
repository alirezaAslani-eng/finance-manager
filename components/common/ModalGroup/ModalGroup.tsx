import { CategoryModalForm } from "@/components/module";
import { ModalHandler } from "@/components/ui";
import { ModalContext } from "@/context";
import { useAddCategory, useEditCategory } from "@/hooks";
import React, { useContext } from "react";

function ModalGroup() {
  // * Modal Context ================ >
  const ModalStates = useContext(ModalContext);

  // * Category Modal Satate ================= >
  const {
    closeAddCategoryModal,
    closeEditCategoryModal,
    isOpenAddCategoryModal,
  } = ModalStates;

  // * Edit Category state ==== >
  const {
    editCategoryModalState: { isOpen: isOpenEditCategoryModal, categoryId },
  } = ModalStates;

  // * Add Category Hook ================== >
  const { addCategory } = useAddCategory();

  // * Edit Category Hook ============== >
  const { editCategory, oldCategoryName } = useEditCategory(categoryId);
  const closeCategoryModal = isOpenEditCategoryModal
    ? closeEditCategoryModal
    : closeAddCategoryModal;
  return (
    <>
      {/* // * Category Modal : Can be oopen for edit and also for create a category ======= > */}
      <ModalHandler
        isOpen={isOpenEditCategoryModal || isOpenAddCategoryModal}
        onClose={closeCategoryModal}
      >
        <CategoryModalForm
          onSubmit={isOpenEditCategoryModal ? editCategory : addCategory}
          onClose={closeCategoryModal}
          edit={isOpenEditCategoryModal} // * edit state
          defaultValues={{ name: oldCategoryName }} // * default value for edit state
        />
      </ModalHandler>
    </>
  );
}

export default ModalGroup;

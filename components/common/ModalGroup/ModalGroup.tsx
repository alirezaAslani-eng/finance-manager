import { CategoryModalForm } from "@/components/module";
import { useModal } from "@/context";
import { useAddCategory, useEditCategory } from "@/hooks";
import { Dialog } from "@mui/material";
import React from "react";

function ModalGroup() {
  // * Modal Context ================ >
  const ModalStates = useModal();

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
      <Dialog
        open={isOpenEditCategoryModal || isOpenAddCategoryModal}
        onClose={closeCategoryModal}
        PaperProps={{
          style: {
            width: "min(100%,500px)",
          },
        }}
      >
        <CategoryModalForm
          onSubmit={isOpenEditCategoryModal ? editCategory : addCategory}
          onClose={closeCategoryModal}
          edit={isOpenEditCategoryModal} // * edit state
          defaultValues={{ name: oldCategoryName }} // * default value for edit state
        />
      </Dialog>
    </>
  );
}

export default ModalGroup;

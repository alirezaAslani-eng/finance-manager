import { CategoryModalForm } from "@/components/module";
import { ModalHandler } from "@/components/ui";
import { ModalContext } from "@/context";
import { useAddCategory } from "@/hooks";
import React, { useContext } from "react";

function ModalGroup() {
  // * Modal Context ================ >
  const ModalStates = useContext(ModalContext);

  // * Category Modal Satate ================= >
  const { closeAddCategoryModal, isOpenAddCategoryModal } = ModalStates;

  // * Add Category Hook ================== >
  const { addCategory } = useAddCategory();
  return (
    <>
      {/* // * Category Modal ---------- > */}
      <ModalHandler
        isOpen={isOpenAddCategoryModal}
        onClose={closeAddCategoryModal}
      >
        <CategoryModalForm  onSubmit={addCategory} />
      </ModalHandler>
    </>
  );
}

export default ModalGroup;

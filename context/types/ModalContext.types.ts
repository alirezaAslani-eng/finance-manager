interface ModalProvidedValue {
  isOpenAddCategoryModal: boolean;
  editCategoryModalState: {
    isOpen: boolean;
    categoryId: string;
  };
  openAddCategoryModal: () => void;
  closeAddCategoryModal: () => void;
  openEditCategoryModal: (openState: { categoryId: string }) => void;
  closeEditCategoryModal: () => void;
}

export type { ModalProvidedValue };

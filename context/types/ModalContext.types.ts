interface ModalProvidedValue {
  isOpenAddCategoryModal: boolean;
  editCategoryModalState: {
    isOpen: boolean;
    categoryId: string;
    newName: string;
  };
  openAddCategoryModal: () => void;
  closeAddCategoryModal: () => void;
  openEditCategoryModal: (openState: {
    newName: string;
    categoryId: string;
  }) => void;
  closeEditCategoryModal: () => void;
}

export type { ModalProvidedValue };

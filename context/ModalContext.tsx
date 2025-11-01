import React, {
  PropsWithChildren,
  useCallback,
  useReducer,
  useState,
} from "react";
import { createContext } from "react";
import { ModalProvidedValue } from "./types/ModalContext.types";

const ModalContext = createContext({} as ModalProvidedValue);

// * This Provider Responsible for providing the state of modals and their dispatchers =============== >
function ModalProvider({ children }: PropsWithChildren) {
  // * States --- >
  // * The state of a modal that responsoble for adding category =================== >
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false);

  // * Modla which is for editing category ========== >
  const [editCategoryModalState, setEditCategoryModalState] = useState<
    ModalProvidedValue["editCategoryModalState"]
  >({
    isOpen: false,
    categoryId: "",
  });

  // * Dispatcher --- >
  // * Category modal Dispatcher ================= >
  const openAddCategoryModal: ModalProvidedValue["openAddCategoryModal"] =
    useCallback(() => {
      setIsOpenAddCategoryModal(true);
    }, []);

  const closeAddCategoryModal: ModalProvidedValue["closeAddCategoryModal"] =
    useCallback(() => {
      setIsOpenAddCategoryModal(false);
    }, []);

  const openEditCategoryModal: ModalProvidedValue["openEditCategoryModal"] =
    useCallback(
      (updatedCategory: Pick<typeof editCategoryModalState, "categoryId">) => {
        const { categoryId } = updatedCategory;
        setEditCategoryModalState({ isOpen: true, categoryId });
      },
      []
    );

  const closeEditCategoryModal: ModalProvidedValue["closeEditCategoryModal"] =
    useCallback(() => {
      setEditCategoryModalState({ categoryId: "", isOpen: false });
    }, []);

  // * Provider Values ================================================= >
  const providerValue: ModalProvidedValue = {
    // * Category modal Dispatcher ================= >
    isOpenAddCategoryModal,
    editCategoryModalState,
    closeAddCategoryModal,
    openAddCategoryModal,
    closeEditCategoryModal,
    openEditCategoryModal,
  };
  //   const providedValue: ModalProvidedValue = {};
  return <ModalContext value={providerValue}>{children}</ModalContext>;
}

export { ModalContext, ModalProvider };

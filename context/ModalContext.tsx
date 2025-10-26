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

  // * Dispatcher --- >
  // * Category modal Dispatcher ================= >
  const openAddCategoryModal = useCallback(() => {
    setIsOpenAddCategoryModal(true);
  }, []);
  const closeAddCategoryModal = useCallback(() => {
    setIsOpenAddCategoryModal(false);
  }, []);

  // * Provider Values ================================================= >
  const providerValue: ModalProvidedValue = {
    // * Category modal Dispatcher ================= >
    closeAddCategoryModal,
    openAddCategoryModal,
    isOpenAddCategoryModal,
  };
  //   const providedValue: ModalProvidedValue = {};
  return <ModalContext value={providerValue}>{children}</ModalContext>;
}

export { ModalContext, ModalProvider };

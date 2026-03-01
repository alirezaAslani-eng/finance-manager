import { useState } from "react";
import useTriggerState from "./useTriggerState";
import { UseModalStateProps, UseModalStateReturn } from "./types";

function useModalState<TInfo = any>(
  options: UseModalStateProps<TInfo> = {},
): UseModalStateReturn<TInfo> {
  const { initialModalInfo = null, initialModalState } = options;

  // * the state of modal that presents the information of a transaction
  const [isOpenModal, openModal, closeModal] =
    useTriggerState(initialModalState);

  // * this state provides the information of a transaction when user click on it
  const [modalInfo, setModalInfo] = useState<TInfo | null>(initialModalInfo);

  // * ==== OPEN IT ====
  const setInfo = (info: TInfo) => {
    setModalInfo(info);
    openModal();
  };
  // * ==== CLOSE IT ====
  const clearInfo = () => {
    setModalInfo(null);
    closeModal();
  };

  return { isOpenModal, modalInfo, openModal: setInfo, closeModal: clearInfo };
}

export default useModalState;

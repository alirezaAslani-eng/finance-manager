import { useCallback, useEffect, useState } from "react";
import useTriggerState from "./useTriggerState";
import { UseModalStateProps, UseModalStateReturn } from "./types";
import useCloseModalByPopstateEvent from "./useCloseModalByPopstateEvent";

function useModalState<TInfo = any>(
  options: UseModalStateProps<TInfo> = {},
): UseModalStateReturn<TInfo> {
  const { initialModalInfo = null, initialModalState, isParentModal } = options;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(
    initialModalState || false,
  );

  const [modalInfo, setModalInfo] = useState<TInfo | null>(initialModalInfo);

  const openModal = useCallback(
    (info: TInfo) => {
      setModalInfo(info);
      setIsOpenModal(true);
      if (isParentModal) historyHandler("OPEN-MODAL");
    },
    [setModalInfo, setIsOpenModal, isParentModal, historyHandler],
  );

  const closeModal = useCallback(() => {
    setModalInfo(null);
    setIsOpenModal(false);
    if (isParentModal) historyHandler("CLOSE-MODAL");
  }, [setModalInfo, setIsOpenModal, isParentModal, historyHandler]);

  const closeModalByPopstateEvent = useCallback(() => {
    if (!isParentModal) return;
    setModalInfo(null);
    setIsOpenModal(false);
  }, [isParentModal]);

  useCloseModalByPopstateEvent({
    isOpenModal,
    closeModal: closeModalByPopstateEvent,
  });

  return { isOpenModal, modalInfo, openModal, closeModal };
}

export default useModalState;

function historyHandler(action: "OPEN-MODAL" | "CLOSE-MODAL") {
  switch (action) {
    case "CLOSE-MODAL": {
      history.back();
      break;
    }
    case "OPEN-MODAL": {
      history.pushState(null, "", location.pathname);
      break;
    }
    default: {
      let neverReachHere: never = action;
    }
  }
}

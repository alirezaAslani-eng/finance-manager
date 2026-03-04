import { useCallback, useEffect } from "react";
import useUpdateEffect from "./useUpdateEffect";

interface Config {
  isOpenModal: boolean;
  closeModal: () => void;
}
function useCloseModalByPopstateEvent({ isOpenModal, closeModal }: Config) {
  const listener = useCallback(() => {
    if (!isOpenModal) return;
    closeModal();
  }, [isOpenModal, closeModal]);

  useEffect(() => {
    window.addEventListener("popstate", listener);
    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, [listener]);

  // * when there is no visible modal this useEffect removes the listener
  useUpdateEffect(() => {
    if (isOpenModal) return;
    window.removeEventListener("popstate", listener);
  }, [isOpenModal, listener]);
}

export default useCloseModalByPopstateEvent;

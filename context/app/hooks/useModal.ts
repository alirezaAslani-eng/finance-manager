import { useContext } from "react";
import { ModalContext } from "../ModalContext";
import { UseModal } from "./types";

const useModal: UseModal = () => {
  const providedValue = useContext(ModalContext);
  return providedValue;
};

export default useModal;

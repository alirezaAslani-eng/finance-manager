import { PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import type { SxProps } from "@mui/material";
// * Modal wrapper style --- >
const style: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
// * Props type --- >
interface MyProps {
  isOpen: boolean;
  onClose?: () => void;
}
// * Component ---- >
const ModalHandler = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<MyProps>) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      {/* // * Your Modal --- > */}
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalHandler;

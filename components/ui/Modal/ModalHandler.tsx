import { PropsWithChildren } from "react";
import Dialog from "@mui/material/Dialog";
interface MyProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ModalHandlerl = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<MyProps>) => {
  return (
    <Dialog open={isOpen} onClose={onClose} >
      <>{children}</>
    </Dialog>
  );
};

export default ModalHandlerl;

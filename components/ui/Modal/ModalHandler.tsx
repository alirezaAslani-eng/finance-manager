import { PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

import { CreateCategoryModalForm } from "@/components/module";
import { useModal } from "@/context";
import DialogBottomSheet from "@/packages/mui/styled-components/Dialog/DialogBottomSheet";
import { Box } from "@mui/material";

function ModalGroup() {
  // * Modal Context ================ >
  const ModalStates = useModal();

  // * Category Modal Satate ================= >
  const {
    closeAddCategoryModal,
    isOpenAddCategoryModal,
  } = ModalStates;

  return (
    <>
      <DialogBottomSheet
        open={isOpenAddCategoryModal}
        onClose={closeAddCategoryModal}
        maxWidth="sm"
      >
        <Box padding={"24px"}>
          <CreateCategoryModalForm onClose={closeAddCategoryModal} />
        </Box>
      </DialogBottomSheet>
    </>
  );
}

export default ModalGroup;

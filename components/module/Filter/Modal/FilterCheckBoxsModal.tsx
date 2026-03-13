import { InputTrigger } from "@/components/ui";
import dana_md from "@/constant/font/dana_md";
import dana_rg from "@/constant/font/dana_rg";
import { useModalState } from "@/hooks";
import { getLengthOfArray } from "@/lib/utils";
import DialogBottomSheet from "@/mui-styled-compoents/Dialog/DialogBottomSheet";
import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import { PropsWithChildren } from "react";

interface FilterCheckBoxsModalProps {
  placeholder: string;
  selectedCheckBoxs: string[];
  onClear?: () => void;
}
function FilterCheckBoxsModal({
  children,
  placeholder,
  selectedCheckBoxs,
  onClear,
}: PropsWithChildren<FilterCheckBoxsModalProps>) {
  const { isOpenModal, closeModal, openModal } = useModalState();

  return (
    <>
      <InputTrigger>
        <InputTrigger.Placeholder onClick={() => openModal(null)}>
          {placeholder}
        </InputTrigger.Placeholder>
        <InputTrigger.TriggerButton onClick={() => openModal(null)}>
          {!!selectedCheckBoxs?.length
            ? `${selectedCheckBoxs.length} مورد`
            : "انتخاب"}
        </InputTrigger.TriggerButton>
      </InputTrigger>

      <DialogBottomSheet
        open={isOpenModal}
        onClose={closeModal}
        maxWidth="xs"
        className={dana_md.className}
      >
        <Box p={"16px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            className={dana_rg.className}
          >
            {/* // * ----------- Close modal button ----------- */}
            <Button
              variant="text-grey"
              size="small"
              sx={(tm) => ({ ...tm.custom!.circleButton })}
              onClick={closeModal}
            >
              <CloseRounded fontSize="medium" />
            </Button>
            {/* // * ----------- Clear checkbos button ----------- */}
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={onClear}
              disabled={!!!getLengthOfArray(selectedCheckBoxs)}
              sx={{ gap: "8px" }}
            >
              {"پاک کردن همه"}
            </Button>
          </Box>
          <Divider sx={{ my: "8px" }} />
          {children}
        </Box>
      </DialogBottomSheet>
    </>
  );
}

export default FilterCheckBoxsModal;

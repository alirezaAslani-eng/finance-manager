import DialogBottomSheet from "@/packages/mui/styled-components/Dialog/DialogBottomSheet";
import { CloseRounded, AddCardRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import Accounts from "./Accounts";
import dana_md from "@/constant/font/dana_md";

interface AccountListModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}
function AccountListModal({
  isOpen = false,
  onClose = () => {},
}: AccountListModalProps) {
  return (
    <DialogBottomSheet
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={dana_md.className}
      sx={(tm) => ({
        [tm.breakpoints.down("sm")]: {
          ["& .MuiPaper-root"]: {
            maxHeight: "70%",
          },
        },
      })}
    >
      <Box p={"0px 20px 20px 20px"}>
        {/* // * ----------- Heading / (Close Buton) & (Add Card Link) ----------- */}
        <Box
          display={"flex"}
          position={"sticky"}
          zIndex={2}
          top={"0"}
          left={"0"}
          py={"16px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgcolor={"background.paper"}
        >
          {/* // * ------- Close Button -------- */}
          <Button
            onClick={onClose}
            size="small"
            variant="text-grey"
            sx={(tm) => ({ ...(tm.custom!.circleButton as object) })}
          >
            <CloseRounded />
          </Button>
          {/* // * ------- Add Card Link -------- */}
          <Link href={"/my-panel/account/add"}>
            <Button
              size="small"
              color="success"
              variant="outlined"
              sx={{ gap: "8px" }}
            >
              {"حساب جدید"}
              <AddCardRounded />
            </Button>
          </Link>
        </Box>
        {/* // * ----------- Main Content / Accounts ----------- */}
        <Box
          display="grid"
          gridTemplateColumns={{ _540: "repeat(2,1fr)", md: "repeat(3,1fr)" }}
          gap="20px"
        >
          <Accounts />
        </Box>
      </Box>
    </DialogBottomSheet>
  );
}

export default AccountListModal;

import { SlotTransition } from "@/packages/mui";
import {
  Dialog,
  DialogProps,
  Fade,
  Slide,
  styled,
  SxProps,
  useMediaQuery,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => {
  return {
    [theme.breakpoints.down("sm")]: {
      ["& .MuiPaper-root"]: {
        borderRadius: "24px 24px 0px 0px !important",
        width: "100%",
        margin: 0,
      },
      ["& .MuiDialog-container"]: {
        alignItems: "end",
      },
    } as SxProps,
  };
});

const SlideTransition = SlotTransition(Slide, { direction: "up" });
const FadeTransition = SlotTransition(Fade);

function DialogBottomSheet(props: DialogProps) {
  const isBefore_sm = useMediaQuery(({ breakpoints }) =>
    breakpoints.down("sm"),
  );
  return (
    <StyledDialog
      {...props}
      slots={{ transition: isBefore_sm ? SlideTransition : FadeTransition }}
    />
  );
}

export default DialogBottomSheet;

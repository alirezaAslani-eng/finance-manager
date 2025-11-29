import { Box, Stack, SxProps } from "@mui/material";
import { DateField, MuiButton } from "@/components/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { endOfDay, startOfDay } from "@/utils";
interface myProps {
  fromOnchange?: (date: Date) => void;
  toOnchange?: (date: Date) => void;
  onCancelToDate?: () => void;
  onCancelFromDate?: () => void;
  fromDateVal?: Date | null;
  toDateVal?: Date | null;
}
const cancelButton_sx: SxProps = {
  position: "absolute",
  zIndex: "2",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "999px",
};
function Datefilter({
  fromOnchange = () => {},
  toOnchange = () => {},
  fromDateVal,
  toDateVal,
  onCancelFromDate = () => {},
  onCancelToDate = () => {},
}: myProps) {
  const to_Date = (date: Date) => toOnchange(endOfDay(date));
  const from_Date = (date: Date) => fromOnchange(startOfDay(date));

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"10px"}
        
      >
        {/* Start Date ==================== > */}
        <Box position={"relative"}>
          {fromDateVal && (
            <MuiButton
              reset
              buttonProps={{
                variant: "text",
                color: "error",
                onClick: (e) => {
                  e.stopPropagation();
                  onCancelFromDate && onCancelFromDate();
                },
                sx: cancelButton_sx,
              }}
            >
              <CloseRoundedIcon />
            </MuiButton>
          )}

          <DateField
            placeholder="از تاریخ"
            onChange={from_Date}
            // * undefined = default date value
            value={fromDateVal ?? undefined}
          />
        </Box>
        {/* End Date ==================== > */}
        <Box position={"relative"}>
          {toDateVal && (
            <MuiButton
              reset
              buttonProps={{
                variant: "text",
                color: "error",
                onClick: (e) => {
                  e.stopPropagation();
                  onCancelToDate && onCancelToDate();
                },
                sx: cancelButton_sx,
              }}
            >
              <CloseRoundedIcon />
            </MuiButton>
          )}
          <DateField
            placeholder="تا تاریخ"
            onChange={to_Date}
            // * undefined = default date value
            value={toDateVal ?? undefined}
          />
        </Box>
      </Stack>
    </>
  );
}

export default Datefilter

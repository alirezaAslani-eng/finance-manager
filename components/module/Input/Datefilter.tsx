import { Box, BoxProps, Stack, SxProps } from "@mui/material";
import { DateField, MuiButton, MuiChip } from "@/components/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { endOfDay, startOfDay } from "@/utils";
interface myProps {
  containerProps?: BoxProps;
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
  containerProps,
  fromOnchange = () => {},
  toOnchange = () => {},
  fromDateVal,
  toDateVal,
  onCancelFromDate = () => {},
  onCancelToDate = () => {},
}: myProps) {
  const to_Date = (date: Date) => toOnchange(startOfDay(date));
  const from_Date = (date: Date) => fromOnchange(endOfDay(date));

  return (
    <Box {...containerProps}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
            placeholder="از تاریخ : "
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
            placeholder="تا تاریخ : "
            onChange={to_Date}
            // * undefined = default date value
            value={toDateVal ?? undefined}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Datefilter;

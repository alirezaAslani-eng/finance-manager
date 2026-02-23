import { Box, Button, Stack, SxProps, Theme } from "@mui/material";
import { DateField } from "@/components/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { endOfDay, startOfDay } from "@/lib/utils";
interface myProps {
  fromOnchange?: (date: Date) => void;
  toOnchange?: (date: Date) => void;
  onCancelToDate?: () => void;
  onCancelFromDate?: () => void;
  fromDateVal?: Date | null;
  toDateVal?: Date | null;
}
const cancelButton_sx: SxProps<Theme> = (theme) => ({
  position: "absolute",
  zIndex: "2",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  ...(theme.custom!.circleButton as object),
});
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

        <DateField
          inputProps={{ placeholder: "از تاریخ" }}
          onChange={from_Date}
          onClear={onCancelFromDate}
          // * undefined = default date value
          value={fromDateVal ?? undefined}
        />

        {/* End Date ==================== > */}

        <DateField
          onClear={onCancelToDate}
          inputProps={{ placeholder: "تا تاریخ" }}
          onChange={to_Date}
          // * undefined = default date value
          value={toDateVal ?? undefined}
        />
      </Stack>
    </>
  );
}

export default Datefilter;
